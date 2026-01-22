import Show from '../models/Show.js';
import Ticket from '../models/Ticket.js';
import { updateExpiredShows } from '../utils/updateExpiredShows.js';
import pagination from "../utils/pagination.js"
import { unlockSeats } from '../utils/unlockSeats.js';

export const bookSeats = async (req, res) => {
    try {
        await updateExpiredShows();
        const { showId, seatIds } = req.body;
        const userId = req.user._id;

        if (!showId || !seatIds?.length) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        //  Find show
        const show = await Show.findById(showId);
        if (!show) {
            return res.status(404).json({ message: "Show not found" });
        }

        //find show is active
        if (!show || show.status === "CANCELLED") {
            return res.status(404).json({ message: "Show is cancelled" });
        }

        //unlock expired seats
        const expiredTickets = await Ticket.find({
            show: showId,
            status: "PENDING",
            expiresAt: { $lt: new Date() }
        });

        for (const ticket of expiredTickets) {
            await unlockSeats(ticket);
            ticket.status = "EXPIRED";
            await ticket.save();
        }
        await show.save();


        //Validate seat existence
        const validSeats = show.seats.filter(seat =>
            seatIds.includes(seat.seatId.toString())
        );

        if (validSeats.length !== seatIds.length) {
            return res.status(400).json({
                message: "Some seats do not exist"
            });
        }

        const unavailable = validSeats.filter(seat => seat.isBooked);
        if (unavailable.length) {
            return res.status(409).json({
                message: "Some seats already booked",
                seats: unavailable.map(s => s.seatId)
            });
        }

        //lock seats
        show.seats.forEach(seat => {
            if (seatIds.includes(seat.seatId.toString())) {
                seat.isBooked = true;
                seat.bookedBy = userId;
            }
        });

        await show.save();

        //calculate price
        let totalPrice = 0;
        validSeats.forEach(seat => {
            totalPrice += show.price[seat.type];
        });

        //creat ticket
        const ticket = await Ticket.create({
            user: userId,
            show: showId,
            seats: seatIds,
            totalPrice,
            status: "PENDING",
            expiresAt: new Date(Date.now() + 1 * 60 * 1000) //1 minutes from now

        });

        res.status(201).json({
            message: "Seats locked, proceed to payment",
            ticketId: ticket._id,
            expiresAt: ticket.expiresAt,
            seats: seatIds,
            totalPrice
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const confirmTicket = async (req, res) => {
    const { ticketId } = req.params;
    const userId = req.user._id;

    // Fetch the ticket first
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.user.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    // If ticket is pending but expired
    if (ticket.status === "PENDING" && new Date() > ticket.expiresAt) {
        await unlockSeats(ticket);
        ticket.status = "EXPIRED";
        await ticket.save();
    }


    // If ticket is already confirmed or invalid
    if (ticket.status !== "PENDING") {
        return res.status(400).json({ message: "Ticket already confirmed or invalid" });
    }

    // Confirm the ticket
    ticket.status = "CONFIRMED";
    await ticket.save();

    res.json({ message: "Booking confirmed" });
};

export const cancelTicket = async (req, res) => {
    try {
        const { ticketId } = req.body;
        const userId = req.user._id;

        if (!ticketId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        if (ticket.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }


        const show = await Show.findById(ticket.show);
        if (!show) {
            return res.status(404).json({ message: "Show not found" })
        }

        await unlockSeats(ticket)
        ticket.status = "CANCELLED";
        await ticket.save();
        res.status(200).json({ message: "Ticket cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const adminCancelTicket = async (req, res) => {
    try {
        const { ticketId } = req.body;
        // console.log(ticketId)
        if (!ticketId) {
            return res.status(400).json({ message: "missing ticketId" })
        }
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        const show = await Show.findById(ticket.show).lean();

        if (!show) {
            return res.status(404).json({ message: "Show not found" })
        }
        await unlockSeats(ticket)
        ticket.status = "CANCELLED";
        ticket.cancelledBy = "ADMIN";

        await ticket.save();
        res.status(200).json({ message: "Ticket cancelled by admin" });


    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

// export const getAllTickets = async (req, res) => {

//     try {
//         const { status, movieId, cinemaId } = req.query;
//         const { limit, skip, page } = pagination(req)

//         const query = {};
//         if (status) query.status = status;

//         const showMatch = {};
//         if (movieId) showMatch.movie = movieId;
//         if (cinemaId) showMatch.cinema = cinemaId;

//         const tickets = await Ticket.find(query)
//             .populate("user", "name email")
//             .populate({
//                 path: "show",
//                 match: showMatch,

//                 populate: [
//                     { path: "movie", select: "title" },
//                     { path: "cinema", select: "name" }
//                 ]
//             })
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit);
//         const total = await Ticket.countDocuments(query);
//         const filteredTickets = movieId || cinemaId
//             ? tickets.filter(ticket => ticket.show !== null)
//             : tickets;

//         res.json({
//             tickets: filteredTickets,
//             total: filteredTickets.length,
//         });
//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// }

export const getAllTickets = async (req, res) => {
    try {
        const { status, movieId, cinemaId } = req.query;
        const { limit, skip, page } = pagination(req);

        const query = {};
        if (status) query.status = status;

        const showMatch = {};
        if (movieId) showMatch.movie = movieId;
        if (cinemaId) showMatch.cinema = cinemaId;

        const tickets = await Ticket.find(query)
            .populate("user", "name email")
            .populate({
                path: "show",
                match: showMatch,
                populate: [
                    { path: "movie", select: "title" },
                    { path: "cinema", select: "name" }
                ]
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const ticketsWithSeatNames = tickets.map(ticket => {
            if (!ticket.show) return ticket;

            const seatNames = ticket.seats.map(seatId => {
                const seat = ticket.show.seats.find(
                    s => s.seatId.toString() === seatId.toString()
                );
                // console.log(`${seat.row}${seat.number}`)
                return seat ? `${seat.row}${seat.number}` : null;
            }).filter(Boolean);

            return {
                ...ticket.toObject(),
                seatNames
            };
        });

        const filteredTickets =
            movieId || cinemaId
                ? ticketsWithSeatNames.filter(ticket => ticket.show !== null)
                : ticketsWithSeatNames;

        res.json({
            tickets: filteredTickets,
            total: filteredTickets.length
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


