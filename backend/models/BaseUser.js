import mongoose from "mongoose";

const baseUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password must be at least 4 characters long']
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    phone: {
        type: String,
        required: true,
    },

    location: {
        city: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            default: "India",
        },
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}
    , { timestamps: true });


const BaseUser = mongoose.model("BaseUser", baseUserSchema);

export default BaseUser;