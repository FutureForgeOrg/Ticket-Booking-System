import razorpay from '../config/razorpay.js'
import crypto from 'crypto';
import Payment from '../models/Payment.js';
import pagination from '../utils/pagination.js';
export const createOrder = async (req, res) => {
    try {
        const { amount, ticketId, showId } = req.body;
        const userId = req.user._id;

        const order = await razorpay.orders.create({
            amount: amount * 100, //  paise
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        });

        console.log("Razorpay Order Created:", order);

        const payment = await Payment.create({
            user: userId,
            bookingType: "show",
            bookingId: ticketId,
            bookingTypeModel: "Ticket",
            amount,
            razorpayOrderId: order.id,
            status: "created",
        });

        console.log("Payment Record Created:", payment);

        res.status(200).json({ success: true, order, paymentId: payment._id });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: "Order creation failed" });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            paymentMethod
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest("hex");


        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id
        });

        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        if (expectedSign === razorpay_signature) {
            payment.status = "paid";
            payment.razorpayPaymentId = razorpay_payment_id;
            payment.razorpaySignature = razorpay_signature;
            payment.paymentMethod = paymentMethod;
            payment.paidAt = new Date();
            await payment.save();


            res.status(200).json({ success: true });
        } else {
            payment.status = "failed";
            payment.failureReason = "Signature mismatch";
            await payment.save();
            res.status(400).json({ success: false });
        }
    } catch (err) {
        res.status(500).json({ success: false });
    }
};

export const refundPayment = async (req, res) => {
    try {
        const { paymentId } = req.body;

        const payment = await Payment.findById(paymentId);

        if (!payment || payment.status !== "paid") {
            return res.status(400).json({ success: false, message: "Invalid payment" });
        }

        const refund = await razorpay.payments.refund(
            payment.razorpayPaymentId,
            {
                amount: payment.amount * 100
            }
        );

        payment.status = "refunded";
        payment.refundId = refund.id;
        payment.refundStatus = refund.status;

        await payment.save();

        res.status(200).json({ success: true, refund });

    } catch (error) {
        res.status(500).json({ success: false });
    }
};

export const getRevenueStats = async (req, res) => {
    try {
        const revenue = await Payment.aggregate([
            { $match: { status: "paid" } },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$amount" },
                    totalTransactions: { $sum: 1 }
                }
            }
        ]);

        res.json({
            success: true,
            revenue: revenue[0] || { totalRevenue: 0, totalTransactions: 0 }
        });

    } catch (error) {
        res.status(500).json({ success: false });
    }
};

export const getAllPayments = async (req, res) => {
    try {
        const { page, limit, skip } = pagination(req);
        const { userId, status, type } = req.query;

        const query = {}
        if (userId) query.user = userId;
        if (status) query.status = status;
        if (type) query.bookingType = type;

        const payments = await Payment.find(query)
            .populate("user", "name email")
            .populate("bookingId")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Payment.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            payments
        });

    } catch (error) {
        console.error("Get All Payments Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getPaymentDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await Payment.findById(id)
            .populate("user", "name email")
            .populate({
                path: "bookingId",
                populate: {
                    path: "show",
                    select: "movie showTime"
                }
            })

        if (!payment) {
            return res.status(404).json({ success: false });
        }

        res.status(200).json({
            success: true,
            payment
        });

    } catch (error) {
        res.status(500).json({ success: false });
    }
};



