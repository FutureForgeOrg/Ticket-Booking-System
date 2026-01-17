import Show from "../models/Show.js";
import Cinema from "../models/Cinema.js";
import Movie from "../models/Movie.js";
import pagination from "../utils/pagination.js";
import { updateExpiredShows } from "../utils/updateExpiredShows.js";
import mongoose from "mongoose";
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
        const movieDuration = movie.runtime * 60 * 1000;

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
        const endTime = new Date(showDate.getTime() + movieDuration);

        if (showDate < new Date()) {
            return res.status(400).json({ message: "Show time cannot be in the past" });
        }


        //prevent duplicate show
        const existingShow = await Show.findOne({
            cinema: cinemaId,
            screenName,
            status: { $ne: "CANCELLED" },
            showTime: { $lt: endTime },
            endTime: { $gt: showDate }
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
            endTime,
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

export const getAllShowsAdmin = async (req, res) => {

    try {

        await updateExpiredShows();

        const { movieId, cinemaId, status } = req.query;

        const { page, limit, skip } = pagination(req);

        const filter = {};
        if (movieId) {
            filter.movie = movieId;
        }
        if (cinemaId) {
            filter.cinema = cinemaId;
        }
        if (status) {
            filter.status = status;
        }

        const shows = await Show.find(filter)
            .populate('movie', 'title duration genres')
            .populate('cinema', 'name location')
            .sort({ status: 1, showTime: -1 })
            .skip(skip)
            .limit(limit);


        const totalShows = await Show.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: shows.length,
            total: totalShows,
            page,
            limit,
            totalPages: Math.ceil(totalShows / limit),
            data: shows
        });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const getAllShows = async (req, res) => {

    try {
        await updateExpiredShows();
        const { movieId, cinemaId } = req.query;
        const { page, limit, skip } = pagination(req);

        const filter = {
            isActive: true,
            status: "ACTIVE"
        };
        if (movieId) {
            filter.movie = movieId;
        }
        if (cinemaId) {
            filter.cinema = cinemaId;
        }

        const shows = await Show.find(filter)
            .populate('movie', 'title duration genres')
            .populate('cinema', 'name location')
            .sort({ showTime: 1 })
            .skip(skip)
            .limit(limit);

        const totalShows = await Show.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: shows.length,
            total: totalShows,
            page,
            limit,
            totalPages: Math.ceil(totalShows / limit),
            data: shows
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getShowById = async (req, res) => {
    try {
        await updateExpiredShows();
        const show = await Show.findById(req.params.id)
            .populate('movie', 'title duration genres')
            .populate('cinema', 'name location');


        if (!show) {
            return res.status(404).json({ message: "Show not found" });
        }
        res.status(200).json({
            success: true,
            data: show
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const cancelShow = async (req, res) => {
    try {
        const showId = req.params.id;
        const show = await Show.findById(showId);
        if (!show) {
            return res.status(404).json({ success: false, message: "Show not found" });
        }
        show.status = "CANCELLED";
        show.isActive = false;
        show.cancelledAt = new Date();
        show.expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // Expires in 2 days
        await show.save();
        res.status(200).json({ success: true, message: "Show cancelled successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const updateShow = async (req, res) => {
    try {
        const { showTime, price } = req.body;
        const id = req.params.id;


        const show = await Show.findById(id).populate('movie');
        if (!show) {
            return res.status(404).json({
                success: false,
                message: "Show not found"
            });
        }

        const movieDuration = show.movie.runtime * 60 * 1000;
        const endTime = new Date(new Date(showTime).getTime() + movieDuration);

        if (show.status === "CANCELLED") {
            return res.status(400).json({
                success: false,
                message: "Cannot update a cancelled show"
            });
        }


        const updateData = {};

        if (showTime) {
            const showDate = new Date(showTime);
            if (isNaN(showDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid show time format"
                });
            }


            if (showDate < new Date()) {
                return res.status(400).json({
                    success: false,
                    message: "Show time cannot be in the past"
                });
            }

            const existingShow = await Show.findOne({
                _id: { $ne: id }, // exclude current show
                cinema: show.cinema,
                screenName: show.screenName,
                status: { $ne: "CANCELLED" },
                showTime: { $lt: endTime },
                endTime: { $gt: showDate }
            });

            if (existingShow) {
                return res.status(400).json({
                    success: false,
                    message: "Another show already exists on this screen and time range"
                });
            }

            updateData.showTime = showDate;
        }

        if (price !== undefined) {
            updateData.price = price;
        }


        const updatedShow = await Show.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Show updated successfully",
            data: updatedShow
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// export const getShowsByMovieAndDate = async (req, res) => {
//     try {
//         await updateExpiredShows();

//         const { movieId } = req.params;
//         const { startDate } = req.query;
//         const { page, limit, skip } = pagination(req);

//         const movie = await Movie.findById(movieId);
//         if (!movie) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Movie not found"
//             });
//         }

//         let start;
//         if (startDate) {
//             start = new Date(startDate);
//             if (isNaN(start.getTime())) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Invalid startDate format"
//                 });
//             }
//         } else {

//             start = new Date();
//         }

//         const filter = {
//             movie: movieId,
//             isActive: true,
//             status: "ACTIVE",
//             showTime: { $gte: start }
//         };

//         const shows = await Show.find(filter)
//             .populate("movie", "title duration genres")
//             .populate("cinema", "name location")
//             .sort({ showTime: 1 })
//             .skip(skip)
//             .limit(limit);

//         const totalShows = await Show.countDocuments(filter);

//         res.status(200).json({
//             success: true,
//             count: shows.length,
//             total: totalShows,
//             page,
//             limit,
//             totalPages: Math.ceil(totalShows / limit),
//             data: shows
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// }



export const getShowsByMovieAndDate = async (req, res) => {
  try {
    await updateExpiredShows();

    const { movieId } = req.params;
    const { startDate, endDate } = req.query;
    const { page, limit, skip } = pagination(req);

    
    let start = new Date();
    start.setHours(0, 0, 0, 0); // start of today

    const end = new Date(start);
    end.setDate(end.getDate() + 2); // next 2 days
    end.setHours(23, 59, 59, 999); // end of day

    if (startDate) {
      const parsedStart = new Date(startDate);
        if (isNaN(parsedStart.getTime())) {
            return res.status(400).json({
            success: false,
            message: "Invalid startDate format",
            });
      }
      start.setTime(parsedStart.getTime());
    }

    if (endDate) {
      const parsedEnd = new Date(endDate);
      if (isNaN(parsedEnd.getTime())) {
            return res.status(400).json({
            success: false,
            message: "Invalid endDate format",
            });
      }
      end.setTime(parsedEnd.getTime());
    }

    if (start > end) {
      return res.status(400).json({
        success: false,
        message: "startDate cannot be after endDate",
      });
    }


    const pipeline = [
      {
        $match: {
          movie: new mongoose.Types.ObjectId(movieId),
          status: "ACTIVE",
          isActive: true,
          showTime: { $gte: start, $lte: end },
        }
      },

      {
        $lookup: {
          from: "cinemas",
          localField: "cinema",
          foreignField: "_id",
          as: "cinema"
        }
      },
      { $unwind: "$cinema" },

      //  Group by cinema + screen
      {
        $group: {
          _id: {
            cinemaId: "$cinema._id",
            screenName: "$screenName"
          },
          cinema: { $first: "$cinema" },
          shows: {
            $push: {
              _id: "$_id",
              showTime: "$showTime",
              endTime: "$endTime",
              price: "$price",
              seats: "$seats"
            }
          }
        }
      },

      //  Group by cinema
      {
        $group: {
          _id: "$_id.cinemaId",
          cinema: { $first: "$cinema" },
          screens: {
            $push: {
              screenName: "$_id.screenName",
              shows: "$shows"
            }
          }
        }
      },

      // project final shape of data for frontend
      {
        $project: {
          _id: 1,   // cinema + screen id for uniqueness
          cinema: {
            _id: "$cinema._id",
            name: "$cinema.name",
            location: "$cinema.location"
          },
          screens: 1
        }
      },

      //  Pagination AFTER grouping
      { $skip: skip },
      { $limit: limit }
    ];

    const data = await Show.aggregate(pipeline);

    // Total cinema count (without pagination)
    const totalResult = await Show.aggregate([
      {
        $match: {
          movie: new mongoose.Types.ObjectId(movieId),
          status: "ACTIVE",
          isActive: true,
          showTime: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: "$cinema"
        }
      },
      { $count: "total" }
    ]);

    const total = totalResult[0]?.total || 0;

    res.status(200).json({
      success: true,
      count: data.length,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
