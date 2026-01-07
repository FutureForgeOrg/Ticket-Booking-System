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
    accessorKey: "status"
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <ShowActions show={row.original} />
    )
  }
];

export default columns;
