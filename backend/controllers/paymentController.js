import razorpay from '../config/razorpay.js'
import crypto from 'crypto';
export const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        const order = await razorpay.orders.create({
            amount: amount * 100, //  paise
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        });

        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Order creation failed" });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest("hex");

        if (expectedSign === razorpay_signature) {

            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false });
        }
    } catch (err) {
        res.status(500).json({ success: false });
    }
};