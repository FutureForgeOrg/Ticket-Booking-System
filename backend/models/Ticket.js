import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BaseUser",
        required: true
    },
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show",
        required: true
    },

    seats: [{
        type: mongoose.Schema.Types.ObjectId
    }],

    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "CONFIRMED", "CANCELLED", "FAILED", "EXPIRED"],
        default: "PENDING"
    },
    cancelledBy: {
        type: String,
        enum: ["USER", "ADMIN"],
    },

    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 2 * 60 * 1000) // 2 mins from now
    }

}, { timestamps: true })

const Ticket = mongoose.model("Ticket", ticketSchema)

export default Ticket;