
import mongoose from "mongoose";
import { capitalizeFirst } from "../utils/formatText.js";

/* ---------- BLOCK SCHEMA ---------- */
const blockSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
        min: 1
    },
    gap: {
        type: Boolean,
        default: false
    },
    seatType: {
        type: String,
        enum: ["regular", "premium", "vip"],
        default: "regular"
    }
}, { _id: false });


/* ---------- ROW SCHEMA ---------- */
const rowLayoutSchema = new mongoose.Schema({
    row: {
        type: String,
        required: true
    },
    blocks: {
        type: [blockSchema],
        required: true,
        validate: v => v.length > 0
    }
}, { _id: false });


/* ---------- LAYOUT SCHEMA ---------- */
const layoutSchema = new mongoose.Schema({

    rowGap: {
        type: Number,
        
    },
    rows: {
        type: [rowLayoutSchema],
        required: true
    }
}, { _id: false });

/* ---------- SCREEN SCHEMA ---------- */
const screenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        set: capitalizeFirst
    },

    //  NEW: abstract layout, not seats
    layout: {
        type: layoutSchema,
        required: true
    }

}, { _id: false });

/* ---------- CINEMA SCHEMA ---------- */
const cinemaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: capitalizeFirst
    },

    location: {
        name: {
            type: String,
            required: true,
            trim: true,
            set: capitalizeFirst
        },
        city: {
            type: String,
            required: true,
            trim: true,
            set: capitalizeFirst
        },
        state: {
            type: String,
            required: true,
            trim: true,
            set: capitalizeFirst
        }
    },

    screens: {
        type: [screenSchema],
        required: true
    }

}, { timestamps: true });

const Cinema = mongoose.model("Cinema", cinemaSchema);
export default Cinema;
