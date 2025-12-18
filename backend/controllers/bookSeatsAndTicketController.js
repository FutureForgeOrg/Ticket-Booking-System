import Show from '../models/Show.js';
import Ticket from '../models/Ticket.js';

export const bookSeats = async (req, res) => {
    try {

        const { showId, seats, userId } = req.body;

        // Validate input
        if (!showId || !userId || !seats) {
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
            totalPrice
        });

        res.status(201).json({
            message: "Booking successful",
            ticketId: ticket._id,
            seats,
            totalPrice
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}