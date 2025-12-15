import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,

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
    }

},
{ timestamps: true }
)

const Movie=mongoose.model("Movie",movieSchema)

export default Movie;