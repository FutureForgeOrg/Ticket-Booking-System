import mongoose from 'mongoose';

const eventBookingSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BaseUser",
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    category: {
        type: String,
        enum: ["VIP", "Gold", "Silver"],
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },

    ticketStatus: {
        type: String,
        enum: ["active", "used", "cancelled"],
        default: "active"
    }

}, { timestamps: true });

const EventBooking = mongoose.model("EventBooking", eventBookingSchema);

export default EventBooking;