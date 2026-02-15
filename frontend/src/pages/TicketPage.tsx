import { useParams } from "react-router-dom";
import { useTicket } from "../hooks/useTicket";
import { TicketCard } from "../components/Tickets/TicketCard";

export default function TicketPage() {
  const { ticketId } = useParams();
  const { data, isLoading, isError } = useTicket(ticketId!);

  if (isLoading) return <p className="p-6">Loading…</p>;
  if (isError || !data) return <p>Error loading ticket</p>;

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <TicketCard ticket={data.data} />
    </div>
  );
}
