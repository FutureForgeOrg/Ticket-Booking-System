import mongoose from "mongoose";

const showSeatSchema = new mongoose.Schema({
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
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

showSchema.index(
    { completedAt: 1 },
    {
        expireAfterSeconds: 30,

    }
);

const show = mongoose.model("show", showSchema);

export default show;