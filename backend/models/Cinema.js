import mongoose from "mongoose";
import { capitalizeFirst } from "../utils/formatText.js";
const seatSchema = mongoose.Schema({
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
    }


}, { _id: false })

const screenSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        set:capitalizeFirst,
    },
    seats: {
        type: [seatSchema],
        required: true
    }


}, { _id: false })

const cinemaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set:capitalizeFirst,
    },
    location: {
        name: {
            type: String,
            required: true,
            trim: true,
            set:capitalizeFirst,
        },
        city: {
            type: String,
            required: true,
            trim: true,
            set:capitalizeFirst,
        },
        state: {
            type: String,
            required: true,
            trim: true,
            set:capitalizeFirst,
        },
    },

    screens: {
        type: [screenSchema],
        required: true

    }
}, { timestamps: true })

const Cinema = mongoose.model("Cinema", cinemaSchema);


export default Cinema;