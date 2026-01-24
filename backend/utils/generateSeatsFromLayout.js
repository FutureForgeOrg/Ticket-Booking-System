import mongoose from "mongoose";

 const generateSeatsFromLayout = (layout) => {
    const seats = [];

    layout.rows.forEach((rowLayout) => {
        let seatNumber = 1;

        rowLayout.blocks.forEach((block) => {

            // Skip gaps (aisle / walking space)
            if (block.gap) {
                return;
            }

            //  Generate seats for this block
            for (let i = 0; i < block.count; i++) {
                seats.push({
                    seatId: new mongoose.Types.ObjectId(),
                    row: rowLayout.row,
                    number: seatNumber,
                    type: block.seatType || "regular",
                    isBooked: false,
                    bookedBy: null
                });

                seatNumber++;
            }
        });
    });

    return seats;
};

export default generateSeatsFromLayout;