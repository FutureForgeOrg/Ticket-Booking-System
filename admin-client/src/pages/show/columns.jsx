import ShowActions from "./ShowActions";

const columns = [
  { header: "Movie", accessorKey: "movie.title" },
  { header: "Cinema", accessorKey: "cinema.name" },
  { header: "Screen", accessorKey: "screenName" },
  {
    header: "Show Time",
    cell: ({ row }) =>
      new Date(row.original.showTime).toLocaleString()
  },
  {
    header: "Status",
    accessorKey: "status"
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <ShowActions show={row.original}/>
    )
  }
];

export default columns;
