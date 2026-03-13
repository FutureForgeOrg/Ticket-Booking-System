import { Check } from "lucide-react";
import type { EventBooking } from "../../types/eventBooking.type";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function EventTicketCard({
  booking,
  event,
}: {
  booking: EventBooking;
  event: {
    title: string;
    posterUrl: string;
    venue: string;
    date: string;
  };
}) {
  const date = new Date(event.date);

  return (
    <div className="relative w-full max-w-md text-text-primary rounded-3xl shadow-soft overflow-hidden bg-surface border border-border hover:scale-110 transition-all duration-200 cursor-pointer">
      <div className="relative bg-canvas">
        <img
          src={event.posterUrl}
          alt={event.title}
          className="w-full max-h-[220px] object-contain mx-auto"
        />
        {/* <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" /> */}
      </div>

      <div className="relative px-6 pt-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-text-primary">{event.title}</h1>
        <p className="text-sm text-text-muted mt-1">{event.venue}</p>

        <div className="absolute left-0 top-1/2 translate-y-1/2 w-4 h-8 bg-border rounded-r-full" />
        <div className="absolute right-0 top-1/2 translate-y-1/2 w-4 h-8 bg-border rounded-l-full" />
      </div>

      <div className="my-5 border-t border-dashed border-border" />

      <div className="px-6 grid grid-cols-2 gap-4 text-sm">
        <Info label="Date" value={formatDate(date.toISOString())} />
        <Info label="Time" value={formatTime(date.toISOString())} />

        <div className="bg-canvas rounded-xl p-3 border border-border">
          <p className="text-text-muted text-xs mb-2">Category</p>
          <p className="font-medium text-text-primary">{booking.category}</p>
        </div>

        <div className="bg-canvas rounded-xl p-3 border border-border">
          <p className="text-text-muted text-xs mb-2">Seats</p>
          <p className="font-medium text-text-primary">{booking.numberOfSeats}</p>
        </div>
      </div>

      <div className="my-5 border-t border-dashed border-border" />

      <div className="px-6 pb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-text-muted">Total Paid</p>
          <p className="text-2xl font-bold text-text-primary">₹{booking.totalAmount}</p>
          <p className="text-xs font-semibold text-primary uppercase tracking-wide flex items-center gap-1">
            {booking.status}
            <Check size={14} />
          </p>
        </div>

        <div className="h-20 w-20 rounded-xl bg-surface p-2 border border-border">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking._id}`}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas rounded-xl p-3 border border-border">
      <p className="text-text-muted text-xs">{label}</p>
      <p className="font-medium mt-0.5 text-text-primary">{value}</p>
    </div>
  );
}
