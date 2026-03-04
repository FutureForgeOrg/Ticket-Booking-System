import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import EventBooking from "../models/EventBooking.js";

export const createEventOrder = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const userId = req.user._id;

        const booking = await EventBooking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Event booking not found"
            });
        }

        const order = await razorpay.orders.create({
            amount: booking.totalAmount * 100,
            currency: "INR",
            receipt: "event_receipt_" + Date.now(),
        });

        const payment = await Payment.create({
            user: userId,
            bookingType: "event",
            bookingId: booking._id,
            bookingTypeModel: "EventBooking",
            amount: booking.totalAmount,
            razorpayOrderId: order.id,
            status: "created"
        });

        res.status(200).json({
            success: true,
            order,
            paymentId: payment._id
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const verifyEventPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
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
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        // Prevent double verification
        if (payment.status === "paid") {
            return res.status(200).json({
                success: true,
                message: "Already verified"
            });
        }

        if (expectedSign === razorpay_signature) {

            payment.status = "paid";
            payment.razorpayPaymentId = razorpay_payment_id;
            payment.razorpaySignature = razorpay_signature;
            payment.paidAt = new Date();
            await payment.save();

            // Confirm booking safely
            const booking = await EventBooking.findById(payment.bookingId);

            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "Event booking not found"
                });
            }

            if (booking.status !== "CONFIRMED") {
                booking.status = "CONFIRMED";
                await booking.save();
            }

            return res.status(200).json({ success: true });

        } else {

            payment.status = "failed";
            payment.failureReason = "Signature mismatch";
            await payment.save();

            return res.status(400).json({ success: false });
        }

    } catch (error) {
        res.status(500).json({ success: false });
    }
};

export const refundEventPayment = async (req, res) => {
    try {
        const { paymentId } = req.body;

        const payment = await Payment.findById(paymentId);

        if (!payment || payment.status !== "paid") {
            return res.status(400).json({
                success: false,
                message: "Invalid payment"
            });
        }

        if (payment.status === "refunded") {
            return res.status(400).json({
                success: false,
                message: "Already refunded"
            });
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

        // Optional: update booking status
        const booking = await EventBooking.findById(payment.bookingId);
        if (booking) {
            booking.status = "CANCELLED";
            await booking.save();
        }

        res.status(200).json({
            success: true,
            refund
        });

    } catch (error) {
        res.status(500).json({ success: false });
    }
};

export const getAllEventPayments = async (req, res) => {
    try {
        const { page, limit, skip } = pagination(req.query);

        const payments = await Payment.find({ bookingType: "event" })
            .populate("user", "name email")
            .populate("bookingId")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Payment.countDocuments({ bookingType: "event" });

        res.status(200).json({
            success: true,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            payments
        });

    } catch (error) {
        res.status(500).json({ success: false });
    }
};