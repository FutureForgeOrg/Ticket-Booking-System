import mongoose from "mongoose";

const generateSeatsFromLayout = (layout) => {
  const seats = [];

  layout.rows.forEach((rowLayout) => {
    let seatNumber = 1;

    rowLayout.blocks.forEach((block) => {

      //  GAP- do nothing
      if (block.gap) {
        return;
      }

      //  SEATS- numbering increases ONLY here
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
