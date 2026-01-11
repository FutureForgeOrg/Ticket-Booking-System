import ShowActions from "./ShowActions";

const columns = [
  { header: "Movie", accessorKey: "movie.title" },
  { header: "Cinema", accessorKey: "cinema.name" },
  { header: "Screen", accessorKey: "screenName" },
  {
    header: "Date",
    cell: ({ row }) => new Date(row.original.showTime).toLocaleDateString()
  },
  {
    header: "Timing",
    cell: ({ row }) => {
      const start = new Date(row.original.showTime);
      const end = new Date(row.original.endTime);

      const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return `${startTime} - ${endTime}`;
    }
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      let statusValue = row.original.status;

      let colorClass = "";
      if (statusValue === "ACTIVE") colorClass = "bg-green-600 font-semibold";
      else if (statusValue === "COMPLETED") colorClass = "bg-yellow-500 font-semibold";
      else if (statusValue === "CANCELLED") colorClass = "bg-red-600 font-semibold";
      else colorClass = "text-gray-500";
      return       <span className={`${colorClass} text-white px-3 py-1 rounded-full text-center text-sm`}> 
      {statusValue}</span>;
    }
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <ShowActions show={row.original} />
    )
  }
];

export default columns;
