import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEventStore from "@/store/event.store";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import Pagination from "@/components/common/Pagination";
import { Edit2 } from "lucide-react";

function EventList() {
  const navigate = useNavigate();
  const {
    events,
    fetchEvents,
    page,
    totalPages,
    setPage,
  } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [page]);

  return (
    <>
      <div className="p-8">
        <PageHeader
          title="Events"
          actionText="Add Event"
          onAction={() => navigate("/createEvent")}
        />

        <DataTable
          columns={[
            {
              header: "Title",
              accessorKey: "title",
              cell: ({ row }) => (
                <div className="flex items-center gap-3">
                  <img
                    src={row.original.posterImage}
                    alt={row.original.title}
                    className="size-8 rounded-md object-cover"
                  />
                  <span className="font-medium">
                    {row.original.title}
                  </span>
                </div>
              ),
            },
            {
              header: "City",
              accessorKey: "city",
            },
            {
              header: "Type",
              accessorKey: "eventType",
            },
            {
              header: "Date",
              accessorKey: "date",
              cell: ({ row }) =>
                new Date(row.original.date).toLocaleDateString(),
            },
            {
              header:"venue",
              accessorKey:"venue"
            },
            {
              header:"duration",
              accessorKey:"duration",
              cell: ({ row }) => `${row.original.duration} mins`
            }
          ]}
          data={events}
          renderActions={(event) => (
            <>
              <button
                className="text-blue-600"
                onClick={() => navigate(`/editEvent/${event._id}`)}
              >
                <div className="flex items-center gap-2">
                  <Edit2 size={18} />
                  <span>Edit</span>
                </div>
              </button>

           
            </>
          )}
        />
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}

export default EventList;
