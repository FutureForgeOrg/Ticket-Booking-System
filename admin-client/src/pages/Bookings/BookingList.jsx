import { useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import Pagination from "@/components/common/Pagination";
import useTicketStore from "@/store/ticket.store";
import BookingActions from "./BookingActions";
import BookingFilters from "./BookingFilters";


export default function BookingList() {
  const {
    tickets,
    page,
    total,
    fetchTickets,
    loading,
    setPage,
    filters,
    totalPages
  } = useTicketStore();

  useEffect(() => {
    fetchTickets();
  }, [page, filters]);


  const columns = [
    { header: "Ticket ID", accessorKey: "_id" },
    { header: "User", accessorKey: "user.name" },
    { header: "Movie", accessorKey: "show.movie.title" },
    { header: "Cinema", accessorKey: "show.cinema.name" },
    {
      header: "Seats",
      cell: ({ row }) => {
        const seatNames = row.original.seatNames || [];
        return seatNames.length ? seatNames.join(", ") : "—";
      },
    },
    { header: "Total", accessorKey: "totalPrice" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        let statusValue = row.original.status;

        let colorClass = "";
        if (statusValue === "CONFIRMED") colorClass = "bg-green-600 font-semibold";
        else if (statusValue === "PENDING") colorClass = "bg-yellow-500 font-semibold";
        else if (statusValue === "CANCELLED") colorClass = "bg-red-500 font-semibold";
        else if (statusValue === "EXPIRED") colorClass = "bg-blue-600 font-semibold";
        else if (statusValue === "FAILED") colorClass = "bg-red-900 font-semibold";
        else colorClass = "text-gray-500";
        return <span className={`${colorClass} text-white px-3 py-1 rounded-full text-center text-sm`}>
          {statusValue}</span>;
      }
    },
    {
      header: "Action",
      cell: ({ row }) => <BookingActions ticket={row.original} />,
    },
  ];

  return (
    <>
      <div>
        <PageHeader title="Ticket Bookings" />

        <BookingFilters />

        <DataTable
          columns={columns}
          data={tickets}

        />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
