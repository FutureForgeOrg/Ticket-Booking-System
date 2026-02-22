import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    eventType: {
        type: String,
        required: true
    },

    comedianName: {
        type: String,
        required: true
    },

    posterUrl: {
        type: String, // Cloudinary
        required: true
    },
    bannerUrl: {
        type: String, // Cloudinary
        required: true
    },

    duration: {
        type: Number, // in minutes
        required: true
    },

    ageRestriction: {
        type: String,
        enum: ["All", "16+", "18+"],
        default: "All"
    },

    isFeatured: {
        type: Boolean,
        default: false
    },

    venue: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    categories: [
        {
            name: {
                type: String,
                enum: ["VIP", "Gold", "Silver"],
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            totalSeats: {
                type: Number,
                required: true
            },
            availableSeats: {
                type: Number,
                required: true
            }
        }
    ],

    bookingsCount: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
export default Event;
