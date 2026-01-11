import ConfirmButton from "@/components/common/ConfirmButton";
import useTicketStore from "@/store/ticket.store";


export default function BookingActions({ ticket }) {
  const { cancelTicket } = useTicketStore();

  if (ticket.status !== "CONFIRMED") return "-";

  return (
    <ConfirmButton
      label="Cancel"
      onConfirm={() => cancelTicket(ticket._id)}
    >cancel</ConfirmButton>
  );
}
