import Show from "../models/Show.js";
import Cinema from "../models/Cinema.js";
import Movie from "../models/Movie.js";



export const createShow = async (req, res) => {

    try {
        const { movieId, cinemaId, screenName, showTime, price } = req.body;


        if (!movieId || !cinemaId || !screenName || !showTime || !price) {
            return res.status(400).json({ message: "All fields are required" })
        }


        //validate movie
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "movie not found" });

        }

        //validate cinema
        const cinema = await Cinema.findById(cinemaId);
        if (!cinema) {
            return res.status(404).json({ message: "cinema not found" });
        }


        //find screen
        const screen = cinema.screens.find(
            (s) => s.name === screenName
        );

        if (!screen) {
            return res.status(404).json({ message: "screen not found in cinema" })
        }

        //copy seats 
        const showSeats = screen.seats.map(seat => ({
            row: seat.row,
            number: seat.number,
            type: seat.type,
            isBooked: false,
            bookedBy: null
        }));




        const showDate = new Date(showTime);
        if (isNaN(showDate.getTime())) {
            return res.status(400).json({ message: "Invalid show time format" });
        }


        //prevent duplicate show
        const existingShow = await Show.findOne({
            movie: movieId,
            cinema: cinemaId,
            screenName,
            showTime: showDate
        });

        if (existingShow) {
            return res.status(400).json({ message: "Show already exists for the given movie, cinema, screen and time" });
        }

        //create show
        const show = await Show.create({
            movie: movieId,
            cinema: cinemaId,
            screenName,
            showTime: showDate,
            seats: showSeats,
            price
        })

        res.status(201).json({
            message: "Show created successfully",
            showId: show._id
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}