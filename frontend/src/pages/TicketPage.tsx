import { useParams } from "react-router-dom";
import { useTicket } from "../hooks/useTicket";
import { Check } from "lucide-react";

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

export default function TicketPage() {
  const { ticketId } = useParams();
  const { data, isLoading, isError } = useTicket(ticketId || "");

  if (!ticketId)
    return <div className="p-6 text-red-500">No ticket ID provided</div>;
  if (isLoading)
    return <div className="p-6 text-neutral-300">Loading ticket…</div>;
  if (isError || !data)
    return <div className="p-6 text-red-500">Failed to load ticket</div>;

  const ticket = data.data;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-md text-white rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Poster */}
        <div className="relative bg-black">
          <img
            src={ticket.movie.poster}
            alt={ticket.movie.title}
            className="w-full max-h-[220px] object-contain mx-auto"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-900 to-transparent" />
        </div>

        {/* Movie Info */}
        <div className="relative px-6 pt-4">
          <h1 className="text-2xl font-extrabold tracking-tight">
            {ticket.movie.title}
          </h1>

          <p className="text-sm text-neutral-400 mt-1">
            {ticket.cinema.name} • {ticket.cinema.location}
          </p>

          <div className="absolute left-0 top-1/2 translate-y-1/2 w-4 h-8 bg-[rgba(0,0,0,0.4)] rounded-r-full" />
          <div className="absolute right-0 top-1/2 translate-y-1/2 w-4 h-8 bg-[rgba(0,0,0,0.4)] rounded-l-full" />
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-dashed border-neutral-700" />

        {/* Show Details */}
        <div className="px-6 grid grid-cols-2 gap-4 text-sm">
          <Info label="Date" value={formatDate(ticket.show.showTime)} />
          <Info
            label="Time"
            value={`${formatTime(ticket.show.showTime)} – ${formatTime(ticket.show.endTime)}`}
          />
          <Info label="Screen" value={ticket.show.screen} />

          <div className="bg-neutral-800/40 rounded-xl p-3">
            <p className="text-neutral-400 text-xs mb-2">Seats</p>
            <div className="flex flex-wrap gap-1">
              {ticket.seats.map((s) => (
                <span
                  key={s.seatName}
                  className={`px-2 py-0.5 rounded-md bg-neutral-700 text-xs font-semibold`}
                >
                  {s.seatName}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-dashed border-neutral-700" />

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-400">Total Paid</p>
            <p className="text-2xl font-bold">₹{ticket.totalPrice}</p>
            <p className="flex items-center gap-x-0.5">
              <p className="text-xs font-semibold text-green-500 uppercase tracking-wide">
                {ticket.status}
                <Check
                  className="inline-block ml-1 mb-0.5 border border-green-500 rounded-full py-0.5"
                  size={16}
                />
              </p>
            </p>
          </div>

          {/* QR */}
          <div className="h-20 w-20 rounded-xl bg-white p-2 flex items-center justify-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.ticketId}`}
              alt="QR code"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small helper */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-neutral-800/30 rounded-xl p-3">
      <p className="text-neutral-400 text-xs">{label}</p>
      <p className="font-medium mt-0.5">{value}</p>
    </div>
  );
}
