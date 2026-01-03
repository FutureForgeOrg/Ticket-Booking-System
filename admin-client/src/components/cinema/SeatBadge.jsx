const colors = {
  regular: "bg-gray-200",
  premium: "bg-yellow-300",
  vip: "bg-purple-300"
};

const SeatBadge = ({ seat }) => (
  <div className={`w-9 h-9 rounded flex items-center justify-center text-xs ${colors[seat.type]}`}>
    {seat.row}{seat.number}
  </div>
);

export default SeatBadge;
