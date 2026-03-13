import { EventTicketCard } from "../components/Tickets/EventCard";
import { useMyEventBookingsQuery } from "../hooks/useMyEventBookings";

export default function MyEventTicketsPage() {
  const { data, isLoading } = useMyEventBookingsQuery();

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6 space-y-10">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-items-center">
        {data?.data.map((booking) => (
          <div key={booking._id} className="flex justify-center w-full">
            <EventTicketCard
              booking={booking}
              event={booking.event}
            />
          </div>
        ))}
      </div>
    </div>
  );
}