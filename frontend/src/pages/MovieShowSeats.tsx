import { useNavigate, useParams } from "react-router-dom";
import { useSeatStore } from "../store/seatStore";
import { useShowSeatsQuery } from "../hooks/useShowsSeatsQuery";
import SeatGrid from "../components/ShowSeatsBooking/SeatGrid";
import { ZoomableLayout } from "../components/ShowSeatsBooking/SeatLens";
import MovieCinemaSeatHeader from "../components/ShowSeatsBooking/MovieCinemaSeatHeader";
import { useBookSeatsMutation } from "../hooks/useBookSeatsMutation";
import { useVerifyPayment } from "../hooks/useVerifyPayment";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useConfirmTicket } from "../hooks/useConfirmTicker";
import { loadRazorpay } from "../lib/razorPay";

export default function ShowSeatPage() {
  const { showId = "" } = useParams();
  const { data, isLoading, error } = useShowSeatsQuery(showId);

  const navigate = useNavigate();

  const selected = useSeatStore((s) => s.selected);
  const selectedList = Object.values(selected);
  const seatIds = selectedList.map((s) => s.seatId);

  const bookSeats = useBookSeatsMutation();
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();
  const confirmTicket = useConfirmTicket();

  const handleProceed = async () => {
    try {
      // 1 lock seats
      const booking = await bookSeats.mutateAsync({
        showId,
        seatIds,
      });

      // 2 create razorpay order
      await loadRazorpay();
      const order = await createOrder.mutateAsync(booking.totalPrice);

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

          navigate(`/booking-success/${booking.ticketId}`, {
            replace: true,
          });
        },
      });

      rzp.open();
    } catch (err: any) {
      alert(err?.message || "Booking failed");
    }
  };

  if (isLoading) return <div className="p-6">Loading seats...</div>;
  if (error || !data?.success)
    return <div className="p-6">Failed to load.</div>;

  const show = data.data;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
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

      <div className="mt-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              Selected: {selectedList.length}
            </p>
            <p className="text-xs text-gray-500">
              {selectedList.map((s) => `${s.row}${s.number}`).join(", ") || "—"}
            </p>
          </div>

          <button
            className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-40"
            disabled={selectedList.length === 0}
            onClick={() => {
              console.log("Book seats:", selectedList);
              handleProceed();
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
