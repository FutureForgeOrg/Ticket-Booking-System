import cron from "node-cron"

import Ticket from "../models/Ticket.js"
import Show from "../models/Show.js";

cron.schedule("*/1 * * * *", async () => {
    const expiredTickets = await Ticket.find({
        status: "PENDING",
        expiresAt: { $lt: new Date() }
    });

    for (const ticket of expiredTickets) {
        const show = await Show.findById(ticket.show);
        if (!show) continue;

        show.seats.forEach(seat => {
            ticket.seats.forEach(
                tSeat => {
                    if (
                        seat.row === tSeat.row &&
                        seat.number === tSeat.number &&
                        seat.bookedBy?.toString() === ticket.user.toString()
                    ) {
                        seat.isBooked = false;
                        seat.bookedBy = null;
                    }
                }
            )
        })
        await show.save();
        ticket.status = "EXPIRED";
        await ticket.save();
    }
})

