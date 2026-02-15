import { TicketCard } from "../components/Tickets/TicketCard";
import { mapMyTicketToTicketData } from "../utils/mapMyTicketToTicketData";
import { useMyTicketsQuery } from "../hooks/useMyTickets";

export default function MyTicketsPage() {
  const { data, isLoading } = useMyTicketsQuery();
  console.log("MyTicketsPage data:", data);

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6 space-y-10">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-items-center">
        {data?.data.map((group) =>
          group.tickets.map((ticket) => (
            <div key={ticket.ticketId} className="flex justify-center w-full">
              <TicketCard ticket={mapMyTicketToTicketData(group, ticket)} onClickRedirection={true}/>
            </div>
          )),
        )}
      </div>
    </div>
  );
}
