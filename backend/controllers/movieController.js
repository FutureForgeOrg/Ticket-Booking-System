import Movie from "../models/Movie.js"
import cloudinary from "../config/cloudinary.js";
import pagination from "../utils/pagination.js";

export const getAllMovies = async (req, res) => {
    try {
        const { page, limit, skip } = pagination(req)

        const movies = await Movie.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });  //latest first

        const totalMovies = await Movie.countDocuments();
        let totalPages = Math.ceil(totalMovies / limit);

        res.status(200).json({
            success: true,
            count: movies.length,
            data: movies,
            totalPages,
            currentPage: page,
            limit,
            totalMovies
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
        
        const {skip, limit, page} = pagination(req);


        const movies = await Movie.find({ genres: genre }).
            skip(skip).
            limit(limit).
            sort({ createdAt: -1 });  //latest first

            const totalMovies = await Movie.countDocuments({ genres: genre });
            let totalPages = Math.ceil(totalMovies / limit);


        res.status(200).json({
            success: true,
            count: movies.length,
            data: movies,
            totalPages,
            currentPage: page,
            limit,
            totalMovies

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

        const {skip, limit, page} = pagination(req);
        const { year } = req.params;
        
        const movies = await Movie.find({ year }).
            skip(skip).
            limit(limit).
            sort({ createdAt: -1 });  

            const totalMovies = await Movie.countDocuments({ year });
            let totalPages = Math.ceil(totalMovies / limit);


        res.status(200).json({
            success: true,
            count: movies.length,
            data: movies,
            totalPages,
            currentPage: page,
            limit,
            totalMovies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch movies by year",
            error: error.message,
        });
    }
};


export const createMovie = async (req, res) => {
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


//helper function to get public id from cloudinary url
const getPublicIdFromUrl = (url) => {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const publicId = fileName.split('.')[0];
    return `movies/posters/${publicId}`;
}

export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)

        if (!movie) {
            return res.status(404).json({ message: "movie not found" })
        }

        let posterUrl = movie.posterUrl;  //older poster url

        if (req.file) {
            //delete old poster from cloudinary
            const publicId = getPublicIdFromUrl(movie.posterUrl);
            await cloudinary.uploader.destroy(publicId);

            //upload new poster
            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "movies/posters" },
                    (error, result) => {
                        if (error) return reject(error);
                        posterUrl = result.secure_url;
                        resolve();
                    }
                ).end(req.file.buffer);
            });
        }

        // update fields
        movie.title = req.body.title ?? movie.title;
        movie.year = req.body.year ?? movie.year;
        movie.runtime = req.body.runtime ?? movie.runtime;
        movie.genres = req.body.genres
            ? JSON.parse(req.body.genres)
            : movie.genres;
        movie.director = req.body.director ?? movie.director;
        movie.actors = req.body.actors ?? movie.actors;
        movie.plot = req.body.plot ?? movie.plot;
        movie.posterUrl = posterUrl;

        await movie.save();

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        // Delete poster from Cloudinary
        const publicId = getPublicIdFromUrl(movie.posterUrl);
        await cloudinary.uploader.destroy(publicId);

        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Movie deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
