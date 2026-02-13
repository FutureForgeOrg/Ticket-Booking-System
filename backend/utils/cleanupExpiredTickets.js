import Ticket from "../models/Ticket.js";
import { unlockSeats } from "./unlockSeats.js";

export const cleanupExpiredTickets = async (showId) => {
  const expiredTickets = await Ticket.find({
    show: showId,
    status: "PENDING",
    expiresAt: { $lt: new Date() }
  });
  
  if (!expiredTickets.length) return;

  for (const ticket of expiredTickets) {
    await unlockSeats(ticket);
  }

  await Ticket.updateMany(
    { _id: { $in: expiredTickets.map(t => t._id) } },
    { $set: { status: "EXPIRED" } }
  );
};
