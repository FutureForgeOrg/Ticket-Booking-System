import mongoose from 'mongoose';

const MovieLikeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BaseUser",
        required: true,

    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
},
    { timestamps: true })

MovieLikeSchema.index({ user: 1, movie: 1 }, { unique: true });

export default mongoose.model("MovieLike", MovieLikeSchema);