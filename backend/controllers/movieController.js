import Movie from "../models/Movie.js"
import cloudinary from "../config/cloudinary.js";
import pagination from "../utils/pagination.js";
import { getPublicIdFromUrl, uploadBufferToCloudinary } from "../utils/mediaUtils.js";


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

        const { skip, limit, page } = pagination(req);


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

        const { skip, limit, page } = pagination(req);
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
        if (!req.files?.poster || !req.files?.banner) {
            return res.status(400).json({ message: "Poster and banner image are required" });
        }

        const [posterResult, bannerResult] = await Promise.all([
            uploadBufferToCloudinary(
                req.files.poster[0].buffer,
                "movies/posters"
            ),
            uploadBufferToCloudinary(
                req.files.banner[0].buffer,
                "movies/banners"
            )
        ]);


        const movie = await Movie.create({
            title: req.body.title,
            year: req.body.year,
            runtime: req.body.runtime,
            genres: JSON.parse(req.body.genres),
            director: req.body.director,
            actors: req.body.actors,
            plot: req.body.plot,
            posterUrl: posterResult.secure_url,
            bannerUrl: bannerResult.secure_url,
            trailerUrl: req.body.trailerUrl
        });

        res.status(201).json(movie);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)

        if (!movie) {
            return res.status(404).json({ message: "movie not found" })
        }

        let posterUrl = movie.posterUrl;  //older poster url
        let bannerUrl = movie.bannerUrl;

        if (req.files?.poster) {
            //delete old poster from cloudinary
            const publicId = getPublicIdFromUrl(movie.posterUrl);
            await cloudinary.uploader.destroy(publicId);

            //upload new poster
            const posterResult = await uploadBufferToCloudinary(
                req.files.poster[0].buffer,
                "movies/posters"
            );

            posterUrl = posterResult.secure_url;
        }


        if (req.files?.banner) {
            const bannerPublicId = getPublicIdFromUrl(movie.bannerUrl);
            if (bannerPublicId) {
                await cloudinary.uploader.destroy(bannerPublicId);
            }

            const bannerResult = await uploadBufferToCloudinary(
                req.files.banner[0].buffer,
                "movies/banners"
            );

            bannerUrl = bannerResult.secure_url;
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
        movie.bannerUrl = bannerUrl;
        movie.trailerUrl = req.body.trailerUrl ?? trailerUrl

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
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }

        // Delete banner from Cloudinary
        const bannerPublicId = getPublicIdFromUrl(movie.bannerUrl);
        if (bannerPublicId) {
            await cloudinary.uploader.destroy(bannerPublicId);
        }

        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Movie deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
