import mongoose from "mongoose";

const showSeatSchema = new mongoose.Schema({
    seatId: { type: mongoose.Schema.Types.ObjectId, required: true },
    row: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        enum: ["regular", "premium", "vip"],
        default: "regular"
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BaseUser",
        default: null
    }
}, { _id: false });


const showSchema = mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },

    cinema: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cinema",
        required: true

    },
    screenName: {
        type: String,
        required: true
    },
    showTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,

    },
    seats: {
        type: [showSeatSchema],
        required: true
    },
    price: {
        regular: { type: Number, required: true },
        premium: { type: Number },
        vip: { type: Number }
    },
    status: {
        type: String,
        enum: ["ACTIVE", "COMPLETED", "CANCELLED"],
        default: "ACTIVE"
    },
    completedAt: {
        type: Date,
        default: null
    },

    cancelledAt: {
        type: Date,
        default: null
    },

    expiresAt: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

showSchema.index(
    { expiresAt: 1 },
    {
        expireAfterSeconds: 0,
    }
);

const Show = mongoose.model("Show", showSchema);

export default Show;