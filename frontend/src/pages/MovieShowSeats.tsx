import { useNavigate, useParams } from "react-router-dom";
import { useSeatStore } from "../store/seatStore";
import { useShowSeatsQuery } from "../hooks/useShowsSeatsQuery";
import SeatGrid from "../components/ShowSeatsBooking/SeatGrid";
import { ZoomableLayout } from "../components/ShowSeatsBooking/SeatLens";
import MovieCinemaSeatHeader from "../components/ShowSeatsBooking/MovieCinemaSeatHeader";
import { useBookSeatsMutation } from "../hooks/useBookSeatsMutation";
import { useVerifyPayment } from "../hooks/useVerifyPayment";
import { useCreateOrder } from "../hooks/useCreatePaymentOrder";
import { useConfirmTicket } from "../hooks/useConfirmTicker";
import { loadRazorpay } from "../lib/razorPay";
import { useEffect } from "react";
import Button from "../components/ui/Button";
import { useCancelTicket } from "../hooks/useCancelTicket";

export default function ShowSeatPage() {
  const { showId = "" } = useParams();
  const { data, isLoading, error } = useShowSeatsQuery(showId);

  const navigate = useNavigate();

  const selected = useSeatStore((s) => s.selected);
  const clearSeats = useSeatStore((s) => s.clear);
  const selectedList = Object.values(selected);
  const seatIds = selectedList.map((s) => s.seatId);

  const bookSeats = useBookSeatsMutation();
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();
  const confirmTicket = useConfirmTicket();
  const cancelTicket = useCancelTicket(showId);

  // clear selected seats when showId changes
  useEffect(() => {
    clearSeats();
  }, [showId, clearSeats]);

  const handleProceed = async () => {
    try {
      // 1 lock seats
      const booking = await bookSeats.mutateAsync({
        showId,
        seatIds,
      });

      // 2 create razorpay order
      await loadRazorpay();
      const orderPayload = {
        amount: booking.totalPrice,
        ticketId: booking.ticketId,
        showId,
      };
      const order = await createOrder.mutateAsync(orderPayload);

      // 3 open razorpay
      const rzp = new (window as any).Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,

        handler: async (response: any) => {
          // 4 verify payment
          const verified = await verifyPayment.mutateAsync(response);

          if (!verified.success) {
            alert("Payment verification failed");
            return;
          }

          // 5 confirm ticket
          await confirmTicket.mutateAsync(booking.ticketId);

          clearSeats(); // from store clear selected seats

          navigate(`/booking-success/${booking.ticketId}`, {
            replace: true,
          });
        },

        modal: {
          ondismiss: async () => {
            await cancelTicket.mutateAsync(booking.ticketId); // release seats in DB
            clearSeats(); // clear frontend
          },
        },
      });

      rzp.open();
    } catch (err: any) {
      alert(err?.message || "Booking failed");
      clearSeats();
    }
  };

  if (isLoading) return <div className="p-6">Loading seats...</div>;
  if (error || !data?.success)
    return <div className="p-6">Failed to load.</div>;

  const show = data.data;

  const totalPrice = selectedList.reduce((sum, seat) => {
    const seatPrice = show.show.price[seat.type] || 0;
    return sum + seatPrice;
  }, 0);

  return (
    <div className="relative max-w-7xl mx-auto p-6 space-y-4">
      {/* header */}
      <MovieCinemaSeatHeader show={show} />

      {/* seats grid */}
      <div className="py-4">
        <ZoomableLayout>
          <SeatGrid
            rows={show.screen.layout.rows}
            rowGap={show.screen.layout.rowGap}
            price={show.show.price}
          />
        </ZoomableLayout>
      </div>

      {selectedList.length > 0 && (
        <div className="sticky bottom-4 z-20 mx-auto max-w-6xl">
          <div className="mx-4 rounded-2xl bg-canvas shadow-lg px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Seat Info */}
              <div>
                <p className="text-sm font-semibold">
                  {selectedList.length} Seat{selectedList.length !== 1 && "s"}{" "}
                  Selected
                </p>

                <p className="mt-1 text-xs text-muted truncate max-w-[220px]">
                  {selectedList.map((s) => `${s.row}${s.number}`).join(", ") ||
                    "—"}
                </p>
              </div>

              {/* CTA */}
              <Button
                disabled={selectedList.length === 0}
                onClick={handleProceed}
                className="text-lg leading-6 font-bold rounded-xl px-16 py-2 disabled:opacity-40"
              >
                Pay ₹ {totalPrice} & Book →
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
