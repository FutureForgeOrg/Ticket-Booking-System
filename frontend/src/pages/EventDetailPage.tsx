import { useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import dayjs from "dayjs";
import useEventByIdQuery from "../hooks/useEventByIdQuery";
import type { EventCategory } from "../types/event.type";

export default function EventDetailPage() {
  const { eventId } = useParams();

  const { data: event, isLoading } = useEventByIdQuery(eventId!);
  if (isLoading) {
    return <div className="h-[400px] bg-skeleton animate-pulse rounded-xl" />;
  }

  if (!event) {
    return <div className="h-screen flex items-center justify-center">Event not found</div>;
  }

  const date = new Date(event.date);

  return (
    <div className="bg-canvas text-text-primary min-h-screen max-w-7xl mx-auto">
      {/* HERO BANNER */}
      <div className="relative h-[420px] w-full overflow-hidden rounded-xl">
        <img src={event.bannerUrl} className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-12 left-12 text-white max-w-xl">
          <h1 className="text-4xl font-bold">{event.title}</h1>

          <p className="mt-2 text-lg opacity-90">{event.comedianName}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* EVENT DETAILS */}
        <div className="bg-surface rounded-xl shadow-soft p-6 space-y-4">
          <h2 className="text-xl font-semibold">Event Details</h2>

          <p className="text-text-secondary">{event.description}</p>

          <div className="grid md:grid-cols-4 gap-6 pt-4 text-sm">
            <div>
              <p className="text-text-muted">Date</p>
              <p className="font-medium">
                {dayjs(date).format("ddd, D MMM, h:mm A")}
              </p>
            </div>

            <div>
              <p className="text-text-muted">Venue</p>
              <p className="font-medium">{event.venue}</p>
            </div>

            <div>
              <p className="text-text-muted">Duration</p>
              <p className="font-medium">{event.duration} minutes</p>
            </div>

            <div>
              <p className="text-text-muted">Age</p>
              <p className="font-medium">{event.ageRestriction}</p>
            </div>
          </div>
        </div>

        {/* TICKETS */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Select Tickets</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {event.categories.map((cat: EventCategory) => (
              <div
                key={cat._id}
                className="bg-surface border border-border rounded-xl p-6 shadow-soft hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{cat.name}</h3>

                <p className="text-text-muted text-sm mt-1">
                  {cat.availableSeats} seats left
                </p>

                <p className="text-2xl font-bold mt-4 text-primary">
                  ₹{cat.price}
                </p>

                <Button className="mt-6 w-full py-2 rounded-lg font-bold">
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
