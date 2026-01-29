// components/Seat.tsx
import clsx from "clsx";
import { useSeatStore } from "../../store/seatStore";
import type { SeatType } from "../../types/showById.type";

type Props = {
  seatId: string;
  row: string;
  number: number;
  type: SeatType;
  isBooked: boolean;
};

export default function Seat({ seatId, row, number, type, isBooked }: Props) {
  const selected = useSeatStore((s) => s.selected);
  const toggleSeat = useSeatStore((s) => s.toggleSeat);

  const isSelected = !!selected[seatId];

  return (
    <button
      type="button"
      disabled={isBooked}
      onClick={() => toggleSeat({ seatId, row, number, type })}
      className={clsx(
        "h-7 w-7 rounded-sm border text-[10px] leading-none transition",
        "flex items-center justify-center",
        isBooked && "cursor-not-allowed opacity-40 line-through",
        !isBooked && !isSelected && "hover:scale-[1.06]",
        isSelected && "bg-green-600 text-white border-green-700",
        !isSelected && !isBooked && "bg-transparent",
        type === "premium" && !isSelected && "border-yellow-500",
        type === "vip" && !isSelected && "border-purple-500",
        type === "regular" && !isSelected && "border-gray-400"
      )}
      title={`${row}${number} • ${type}${isBooked ? " • booked" : ""}`}
    >
      {row}{number}
    </button>
  );
}
