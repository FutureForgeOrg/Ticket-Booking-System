import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Card from "./Card";
// import { useCityStore } from "../../store/cityStore";
import dayjs from "dayjs";

interface Event {
  _id: string;
  title: string;
  eventType: string;
  comedianName?: string;
  posterUrl: string;
  venue: string;
  city: string;
  date: string;
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();
  //   const { city: selectedCity } = useCityStore();

  return (
    <Card className="w-52 overflow-hidden group cursor-pointer transition-all duration-300">
      {/* Poster */}
      <div className="relative">
        <img
          src={event.posterUrl}
          alt={event.title}
          className="h-70 w-full object-cover"
        />

        {/* Event Type Badge */}
        <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
          {event.eventType}
        </span>

        <div className="w-full bg-black absolute bottom-0 h-[10%] flex items-center justify-start">
          <p className="text-lg text-white px-2 py-1">
            {dayjs(event.date).format("ddd, D MMM")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-lg font-semibold line-clamp-1" title={event.title}>
          {event.title}
        </h3>

        {event.comedianName && (
          <p className="text-sm text-text-muted line-clamp-1">
            {event.comedianName}
          </p>
        )}

        <p className="text-sm text-text-muted">
          {new Date(event.date).toLocaleDateString()}
        </p>

        <p className="text-xs text-text-muted line-clamp-1">{event.venue}</p>

        <Button
          size="sm"
          className="mt-3 w-full"
          onClick={() => {
            // const formatSelectedCity = selectedCity.toLowerCase();
            navigate(`/events/${event._id}`);
          }}
        >
          Book Event
        </Button>
      </div>
    </Card>
  );
}
