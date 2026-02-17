import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BaseUser",
        required: true
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    },
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        default: "INR"
    },
    razorpayOrderId: {
        type: String,
        required: true
    },

    razorpayPaymentId: {
        type: String
    },

    razorpaySignature: {
        type: String
    },
    paymentMethod: {
        type: String
    },

    status: {
        type: String,
        enum: ["created", "paid", "failed", "refunded"],
        default: "created"
    },
    failureReason: {
        type: String
    },

    refundId: {
        type: String
    },

    refundStatus: {
        type: String
    },

    paidAt: {
        type: Date
    }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;