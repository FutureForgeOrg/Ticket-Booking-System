const generateSeatsFromRows = (rows) => {
    const seats = [];

    rows.forEach(({ row, count, type }) => {
        for (let i = 1; i <= count; i++) {
            seats.push({
                row,       // row letter
                number: i, // seat number
                type       // seat type
            });
        }
    });

    return seats;
};



export default generateSeatsFromRows;