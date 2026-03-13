import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../components/ui/Button";
import dayjs from "dayjs";
import useEventByIdQuery from "../hooks/useEventByIdQuery";
import { useBookEventSeatsMutation } from "../hooks/useBookEventSeatsMutation";
import { useCreateEventOrder } from "../hooks/useCreateEventOrder";
import { useVerifyEventPayment } from "../hooks/useVerifyEventPayment";
import { useConfirmEventBooking } from "../hooks/useConfirmEventBooking";
import { useCancelEventBooking } from "../hooks/useCancelEventBooking";
import { loadRazorpay } from "../lib/razorPay";
import type { EventCategory } from "../types/event.type";

export default function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: event, isLoading } = useEventByIdQuery(eventId!);

  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);
  const [quantity, setQuantity] = useState(1);

  const bookSeats = useBookEventSeatsMutation();
  const createOrder = useCreateEventOrder();
  const verifyPayment = useVerifyEventPayment();
  const confirmBooking = useConfirmEventBooking();
  const cancelBooking = useCancelEventBooking();

  useEffect(() => {
    // Reset selection when event changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedCategory(null);
    setQuantity(1);
  }, [eventId]);

  if (isLoading) {
    return <div className="h-[400px] bg-skeleton animate-pulse rounded-xl" />;
  }

  if (!event) {
    return <div className="h-screen flex items-center justify-center">Event not found</div>;
  }

  const date = new Date(event?.date);

  const totalAmount = selectedCategory ? selectedCategory.price * quantity : 0;

  const handleProceed = async () => {
    if (!selectedCategory) return;

    try {
      // 1) Lock seats
      const bookingResponse = await bookSeats.mutateAsync({
        eventId: event._id,
        category: selectedCategory.name,
        numberOfSeats: quantity,
      });

      // 2) Create razorpay order
      await loadRazorpay();
      const order = await createOrder.mutateAsync({ bookingId: bookingResponse.bookingId });

      // 3) Open razorpay modal
      const rzp = new (window as any).Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        handler: async (response: any) => {
          const verified = await verifyPayment.mutateAsync(response);

          if (!verified.success) {
            alert("Payment verification failed");
            return;
          }

          await confirmBooking.mutateAsync(bookingResponse.bookingId);

          // Refresh event details to reflect updated booking counts
          queryClient.invalidateQueries({ queryKey: ["event", event._id] });

          navigate(`/events/booking-success/${bookingResponse.bookingId}`, {
            replace: true,
          });
        },
        modal: {
          ondismiss: async () => {
            if (bookingResponse.bookingId) {
              await cancelBooking.mutateAsync(bookingResponse.bookingId);
              queryClient.invalidateQueries({ queryKey: ["event", event._id] });
            }
            setSelectedCategory(null);
            setQuantity(1);
          },
        },
      });

      rzp.open();
    } catch (err: any) {
      alert(err?.message || "Booking failed");
      setSelectedCategory(null);
      setQuantity(1);
    }
  };

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
              <p className="font-medium">{dayjs(date).format("ddd, D MMM, h:mm A")}</p>
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
                className={`bg-surface border border-border rounded-xl p-6 shadow-soft hover:shadow-lg transition ${
                  selectedCategory?.name === cat.name ? "border-primary" : ""
                }`}
              >
                <h3 className="text-lg font-semibold">{cat.name}</h3>

                <p className="text-text-muted text-sm mt-1">
                  {cat.availableSeats} seats left
                </p>

                <p className="text-2xl font-bold mt-4 text-primary">₹{cat.price}</p>

                <Button
                  className="mt-6 w-full py-2 rounded-lg font-bold"
                  onClick={() => setSelectedCategory(cat)}
                >
                  Book Now
                </Button>
              </div>
            ))}
          </div>

          {selectedCategory && (
            <div className="rounded-2xl bg-surface border border-border p-6 shadow-soft">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{selectedCategory.name}</h3>
                  <p className="text-sm text-text-muted">
                    {selectedCategory.availableSeats} seats available
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-text-muted">Quantity</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="h-8 w-8 rounded-lg bg-surface border border-border"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      type="button"
                    >
                      -
                    </button>
                    <span className="w-10 text-center">{quantity}</span>
                    <button
                      className="h-8 w-8 rounded-lg bg-surface border border-border"
                      onClick={() =>
                        setQuantity((q) =>
                          Math.min(selectedCategory.availableSeats, q + 1),
                        )
                      }
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-text-muted">Total</p>
                  <p className="text-2xl font-bold">₹{totalAmount}</p>
                </div>

                <Button
                  onClick={handleProceed}
                  className="w-full md:w-auto px-8 py-3 font-bold"
                  disabled={
                    bookSeats.status === "pending" ||
                    createOrder.status === "pending" ||
                    verifyPayment.status === "pending"
                  }
                >
                  {bookSeats.status === "pending" ||
                  createOrder.status === "pending" ||
                  verifyPayment.status === "pending"
                    ? "Processing..."
                    : "Pay & Book"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
