import MovieLike from "../models/MovieLike.js";
import Movie from "../models/Movie.js"

export const toggleLikeMovie = async (req, res) => {
    try {
        const { userId } = req.body;
        const { movieId } = req.params;

        const existingLike = await MovieLike.findOne({
            user: userId,
            movie: movieId,
        });


        if (existingLike) {
            await MovieLike.deleteOne({ _id: existingLike._id });

            await Movie.findByIdAndUpdate(
                { _id: movieId, likesCount: { $gt: 0 } },
                { $inc: { likesCount: -1 } }
            );

            return res.json({
                liked: false,
                message: "Movie unliked",
            });
        }

        await MovieLike.create({
            user: userId,
            movie: movieId
        });

        await Movie.findByIdAndUpdate(movieId, {
            $inc: { likesCount: 1 }
        });

        res.status(201).json({
            liked: true,
            message: "Movie liked",
        });
    } catch (error) {

        //for handling race condition and prevent duplicate like
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Already liked",
            });
        }

        res.status(500).json({ message: "Server error" });

    }
}

export const getLikeStatus = async (req, res) => {
    const { userId } = req.body;
    const { movieId } = req.params;

    const liked = await MovieLike.exists({
        user: userId,
        movie: movieId,
    });

    res.json({ liked: !!liked });

}