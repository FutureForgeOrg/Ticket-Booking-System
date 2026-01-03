import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    releaseDate: {
        type: Date,
        required: true,
        index: true
    },

    status: {
        type: String,
        enum: ["UPCOMING", "RELEASED", "ARCHIVED"],
        default: "UPCOMING",
        index: true
    },
    runtime: {
        type: Number,   //minutes
        required: true

    },
    genres: {
        type: [String],
        // enum: ["Action", "Comedy", "Drama", "Thriller", "Horror", "Romance"],
        index: true
    },
    director: {
        type: String
    },
    actors: {
        type: String
    },
    plot: {
        type: String
    },
    posterUrl: {
        type: String
    },
    bannerUrl: {
        type: String
    },
    trailerUrl: {
        type: String
    },
    likesCount: {
        type: Number,
        default: 0
    },

},
    { timestamps: true }
)


movieSchema.pre('save', function () {
    
    if (this.releaseDate <= new Date()) {
        this.status = "RELEASED";
    } else {
        this.status = "UPCOMING";
    }
    
});


const Movie = mongoose.model("Movie", movieSchema)

export default Movie;