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
            arrayFilters: [{ "seat._id": { $in: ticket.seats } }]
        }
    );
};

