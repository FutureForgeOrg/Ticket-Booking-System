import Show from '../models/Show.js';
import Ticket from '../models/Ticket.js';
import { updateExpiredShows } from '../utils/updateExpiredShows.js';
import pagination from "../utils/pagination.js"

export const bookSeats = async (req, res) => {
    try {
        await updateExpiredShows();
        const { showId, seats } = req.body;
        const userId = req.user._id;

        // Validate input
        if (!showId || !seats) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (!seats || seats.length === 0) {
            return res.status(400).json({ message: "No seats selected" });
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
            show.seats.forEach(seat => {
                ticket.seats.forEach(tSeat => {
                    if (
                        seat.row === tSeat.row &&
                        seat.number === tSeat.number &&
                        seat.bookedBy?.toString() === ticket.user.toString()
                    ) {
                        seat.isBooked = false;
                        seat.bookedBy = null;
                    }
                });
            });

            ticket.status = "EXPIRED";
            await ticket.save();
        }
        await show.save();

        //check if seat exists
        const invalidSeats = seats.filter(s => !show.seats.find(seat => seat.row === s.row && seat.number === s.number));

        if (invalidSeats.length > 0) {
            return res.status(400).json({
                message: "Some selected seats do not exist in this show",
                seats: invalidSeats
            });
        }


        const seatKeys = seats.map(seat => `${seat.row}-${seat.number}`);


        const unavailable = show.seats.filter(
            seat =>
                seatKeys.includes(`${seat.row}-${seat.number}`) &&
                seat.isBooked
        )
        if (unavailable.length > 0) {
            return res.status(409).json({
                message: "Some seats are already booked",
                seats: unavailable
            });
        }

        //lock seats

        show.seats = show.seats.map(seat => {
            if (seatKeys.includes(`${seat.row}-${seat.number}`)) {
                seat.isBooked = true;
                seat.bookedBy = userId;
            }
            return seat;
        });
        await show.save();

        //calculate price
        let totalPrice = 0;
        seats.forEach(s => {
            const seatData = show.seats.find(
                seat => seat.row === s.row && seat.number === s.number
            );
            totalPrice += show.price[seatData.type];
        })

        //creat ticket
        const ticket = await Ticket.create({
            user: userId,
            show: showId,
            seats,
            totalPrice,
            status: "PENDING",
            expiresAt: new Date(Date.now() + 1 * 60 * 1000) //1 minutes from now

        });

        res.status(201).json({
            message: "Seats locked, proceed to payment",
            ticketId: ticket._id,
            expiresAt: ticket.expiresAt,
            seats,
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
    if (ticket.status === "PENDING" && new Date() > new Date(ticket.expiresAt)) {
        const show = await Show.findById(ticket.show);
        if (show) {
            // Unlock seats
            show.seats.forEach(seat => {
                ticket.seats.forEach(tSeat => {
                    if (
                        seat.row === tSeat.row &&
                        seat.number === tSeat.number &&
                        seat.bookedBy?.toString() === ticket.user.toString()
                    ) {
                        seat.isBooked = false;
                        seat.bookedBy = null;
                    }
                });
            });

            await show.save();
        }

        ticket.status = "EXPIRED";
        await ticket.save();

        return res.status(400).json({ message: "Ticket expired, seats unlocked" });
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

        show.seats.forEach(seat => {
            ticket.seats.forEach(tSeat => {
                if (
                    seat.row === tSeat.row &&
                    seat.number === tSeat.number &&
                    seat.bookedBy?.toString() === ticket.user.toString()
                ) {
                    seat.isBooked = false;
                    seat.bookedBy = null;
                }
            });
        });

        await show.save();

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

        if (!ticketId) {
            return res.status(400).json({ message: "missing ticketId" })
        }
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        const show = await Show.findById(ticket.show);
        if (!show) {
            return res.status(404).json({ message: "Show not found" })
        }
        show.seats.forEach(seat => {
            ticket.seats.forEach(tSeat => {
                if (
                    seat.row === tSeat.row &&
                    seat.number === tSeat.number &&
                    seat.bookedBy?.toString() === ticket.user.toString()
                ) {
                    seat.isBooked = false;
                    seat.bookedBy = null;
                }
            });
        });
        await show.save();
        ticket.status = "CANCELLED";
        ticket.cancelledBy = "ADMIN";

        await ticket.save();
        res.status(200).json({ message: "Ticket cancelled by admin" });


    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

export const getAllTickets = async (req, res) => {

    try {
        const { status, movieId, cinemaId } = req.query;
        const { limit, skip, page } = pagination(req)

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
        const total = await Ticket.countDocuments(query);
        const filteredTickets = movieId || cinemaId
            ? tickets.filter(ticket => ticket.show !== null)
            : tickets;

        res.json({
            tickets: filteredTickets,
            total: filteredTickets.length,
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

