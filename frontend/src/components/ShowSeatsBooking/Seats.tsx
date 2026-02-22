// components/Seat.tsx
import clsx from "clsx";
import { useSeatStore } from "../../store/seatStore";
import type { SeatType } from "../../types/showById.type";
import { useAuthStore } from "../../store/authStore";

type Props = {
  seatId: string;
  row: string;
  number: number;
  type: SeatType;
  isBooked: boolean;
  bookedBy?: string | null;
};

export default function Seat({ seatId, row, number, type, isBooked, bookedBy }: Props) {
  const selected = useSeatStore((s) => s.selected);
  const toggleSeat = useSeatStore((s) => s.toggleSeat);
  const user = useAuthStore((s) => s.user);

  const isSelected = !!selected[seatId];

  return (
    <button
      type="button"
      disabled={isBooked}
      onClick={() => toggleSeat({ seatId, row, number, type })}
      className={clsx(
        "size-8 rounded-sm border text-[10px] leading-none transition",
        "flex items-center justify-center",
        isBooked && bookedBy === user?._id && "bg-seat-booked text-white cursor-not-allowed opacity-40",
        isBooked && "cursor-not-allowed opacity-40 line-through",
        !isBooked && !isSelected && "hover:scale-[1]",
        isSelected && "bg-seat-selected text-white border-seat-selected",
        !isSelected && !isBooked && "bg-transparent",
        type === "premium" && !isSelected && "border-seat-premium",
        type === "vip" && !isSelected && "border-seat-vip",
        type === "regular" && !isSelected && "border-seat-regular"
      )}
      title={`${row}${number} • ${type}${isBooked ? " • booked" : ""}`}
    >
      {row}{number}
    </button>
  );
}
