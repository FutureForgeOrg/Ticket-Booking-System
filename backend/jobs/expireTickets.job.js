// Cron to expire tickets that are not paid within 2 mins of booking and unlock the seats for others to book

import cron from "node-cron";
import Ticket from "../models/Ticket.js";
import Show from "../models/Show.js";

console.log("🕒 Expire Ticket Cron Job Registered...");

// to run every 1 min = */1 * * * *
// to run every 30 min = */30 * * * *

cron.schedule("*/1 * * * *", async () => {
  // every 1 min

  //  all tickets expire date
  // const allTickets = await Ticket.find().select("expiresAt");
  // console.log("Current Tickets in DB with Expiry Times:", allTickets);

  console.log("\n==============================");
  console.log("⏰ Cron Triggered At:", new Date().toISOString());
  console.log("==============================");

  try {
    const now = new Date();
    console.log("🔎 Looking for expired tickets before:", now);

    const expiredTickets = await Ticket.find({
      status: "PENDING",
      expiresAt: { $lt: now },
    });

    console.log(`📦 Expired Tickets Found: ${expiredTickets.length}`);

    if (expiredTickets.length === 0) {
      console.log("✅ No expired tickets right now.");
      return;
    }

    for (const ticket of expiredTickets) {
      console.log("\n--------------------------------");
      console.log("🎟 Processing Ticket ID:", ticket._id);

      const show = await Show.findById(ticket.show);
      if (!show) {
        console.log("❌ Show not found");
        continue;
      }

      let seatsUnlocked = 0;

      show.seats.forEach((seat) => {
        const isMatch =
          ticket.seats.includes(seat.seatId.toString()) &&
          seat.bookedBy?.toString() === ticket.user.toString();

        if (isMatch) {
          console.log(`🔓 Unlocking Seat -> SeatId: ${seat.seatId}`);

          seat.isBooked = false;
          seat.bookedBy = null;
          seatsUnlocked++;
        }
      });

      console.log(`🪑 Seats Unlocked: ${seatsUnlocked}`);

      show.markModified("seats");
      await show.save();

      ticket.status = "EXPIRED";
      await ticket.save();

      console.log("✅ Ticket expired & seats unlocked");
    }

    console.log("\n✅ Cron cycle completed successfully.");
  } catch (error) {
    console.error("🔥 Cron Error:", error);
  }
});
