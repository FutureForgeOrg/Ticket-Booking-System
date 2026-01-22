import Show from "../models/Show.js"
export const unlockSeats = async (ticket) => {
    await Show.updateOne(
        { _id: ticket.show },
        {
            $set: {
                "seats.$[seat].isBooked": false,
                "seats.$[seat].bookedBy": null
            }
        },
        {
            arrayFilters: [{ "seat.seatId": { $in: ticket.seats } }]
        }
    );
};


// export const unlockSeats = async (ticket) => {
//     const show = await Show.findById(ticket.show); 
//     show.seats.forEach(seat => {
//         if (ticket.seats.some(s => s.toString() === seat.seatId.toString())) {
//             seat.isBooked = false;
//             seat.bookedBy = null;
//         }
//     });
//     await show.save();
// };





