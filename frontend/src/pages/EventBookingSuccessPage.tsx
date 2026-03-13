import { useParams } from "react-router-dom";
import useEventBookingQuery from "../hooks/useEventBookingQuery";
import useEventByIdQuery from "../hooks/useEventByIdQuery";
import { EventTicketCard } from "../components/Tickets/EventCard";

export default function EventBookingSuccessPage() {
  const { bookingId } = useParams();
  const {
    data: bookingData,
    isLoading: isBookingLoading,
    isError: isBookingError,
  } = useEventBookingQuery(bookingId ?? "");

  const eventId =
    typeof bookingData?.booking?.event === "string"
      ? bookingData.booking.event
      : (bookingData?.booking?.event as any)?._id;

  const { data: event, isLoading: isEventLoading } = useEventByIdQuery(
    eventId ?? "",
  );

  if (isBookingLoading || isEventLoading)
    return <p className="p-6">Loading…</p>;
  if (
    isBookingError ||
    !bookingId ||
    !bookingData?.booking ||
    !eventId ||
    !event
  )
    return <p className="p-6">Booking not found</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <EventTicketCard booking={bookingData.booking} event={event} />
      {/* <div className="flex justify-center">
        <Button onClick={() => navigate("/events/all")} className="px-8">
          Browse Other Events
        </Button>
      </div> */}
    </div>
  );
}
