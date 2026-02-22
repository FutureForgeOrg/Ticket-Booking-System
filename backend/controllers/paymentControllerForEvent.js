export const createEventOrder = async (req, res) => {
    try {
        const { amount, bookingId } = req.body;
        const userId = req.user._id;

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: "event_receipt_" + Date.now(),
        });

        const payment = await Payment.create({
            user: userId,
            bookingType: "event",
            bookingId,
            bookingTypeModel: "EventBooking",
            amount,
            razorpayOrderId: order.id
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

        if (expectedSign === razorpay_signature) {

            payment.status = "paid";
            payment.razorpayPaymentId = razorpay_payment_id;
            payment.razorpaySignature = razorpay_signature;
            payment.paidAt = new Date();
            await payment.save();

            // Confirm booking
            const booking = await EventBooking.findById(payment.bookingId);
            booking.status = "CONFIRMED";
            await booking.save();

            res.status(200).json({ success: true });

        } else {
            payment.status = "failed";
            await payment.save();
            res.status(400).json({ success: false });
        }

    } catch (error) {
        res.status(500).json({ success: false });
    }
};