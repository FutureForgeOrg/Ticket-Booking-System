import Movie from "../models/Movie.js"
import cloudinary from "../config/cloudinary.js";

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();

        res.status(200).json({
            success: true,
            count: movies.length,
            data: movies,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch movies",
            error: error.message,
        });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
            });
        }

        res.status(200).json({
            success: true,
            data: movie,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid movie ID",
            error: error.message,
        });
    }
};

export const getMoviesByGenre = async (req, res) => {
    try {
        const { genre } = req.params;

        const movies = await Movie.find({ genres: genre });

        res.status(200).json({
            success: true,
            count: movies.length,
            data: movies,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch movies by genre",
            error: error.message,
        });
    }
};

export const getMoviesByYear = async (req, res) => {
    try {
        const { year } = req.params;

        const movies = await Movie.find({ year });

        res.status(200).json({
            success: true,
            count: movies.length,
            data: movies,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch movies by year",
            error: error.message,
        });
    }
};


export const createMovie = async (req,res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Poster image is required" });
        }

        const result = await cloudinary.uploader.upload_stream(

            { folder: "movies/posters" },


            async (error, uploadResult) => {   //callback function
                if (error) {
                    return res.status(500).json({ message: "Cloudinary upload failed" });
                }


                const movie = await Movie.create({
                    title: req.body.title,
                    year: req.body.year,
                    runtime: req.body.runtime,
                    genres: JSON.parse(req.body.genres),
                    director: req.body.director,
                    actors: req.body.actors,
                    plot: req.body.plot,
                    posterUrl: uploadResult.secure_url
                });

                res.status(201).json(movie);
            }

        );


        result.end(req.file.buffer);  //sends binary image to Cloudinary
                                    //starts the actual upload
                                    //Until this line => nothing uploads


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
