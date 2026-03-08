import Movie from "../models/Movie.js";
import Event from "../models/Event.js";

export const getFeaturedBanners = async (req, res) => {
  try {
    const featuredMovies = await Movie.find({ isFeatured: true }).select(
      "title posterUrl bannerUrl",
    );
    const featuredEvents = await Event.find({ isFeatured: true }).select(
      "title posterUrl bannerUrl",
    );

    const movieBanners = featuredMovies.map((movie) => ({
      id: movie._id,
      title: movie.title,
      posterUrl: movie.posterUrl,
      bannerUrl: movie.bannerUrl,
      link: `/movies/${movie._id}`,
      type: "movie",
    }));

    const eventBanners = featuredEvents.map((event) => ({
      id: event._id,
      title: event.title,
      posterUrl: event.posterUrl,
      bannerUrl: event.bannerUrl,
      link: `/events/${event._id}`,
      type: "event",
    }));

    const banners = [...movieBanners, ...eventBanners];

    res.json({
      success: true,
      banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
