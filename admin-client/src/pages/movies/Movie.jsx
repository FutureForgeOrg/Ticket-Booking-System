import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMovieStore from "@/store/movie.store";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import ConfirmButton from "@/components/common/ConfirmButton";
import { Edit2, Trash2 } from "lucide-react";
import ConfirmButtonAlert from "@/components/common/ConfirmButtonALert";
import Pagination from "@/components/common/Pagination";

function Movie() {
  const navigate = useNavigate();
  const { movie, fetchMovies, deleteMovie,page, totalPages, setPage } = useMovieStore();
  useEffect(() => {
    fetchMovies();
    console.log(movie);
  }, [page]);

  return (
    <>
      <div className="p-8">
        <PageHeader
          title="Movies"
          actionText="Add Movie"
          onAction={() => navigate("/createMovie")}
        />
        <DataTable
          columns={[
            {
              header: "Title",
              accessorKey: "title",
              cell: ({ row }) => (
                <div className="flex items-center gap-3">
                  <img
                    src={row.original.posterUrl}
                    alt={row.original.title}
                    className="size-8 rounded-md object-cover"
                  />
                  <span className="font-medium">{row.original.title}</span>
                </div>
              ),
            },
            {
              header: "Status",
              accessorKey: "status",
              cell: ({ row }) => (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${row.original.status === "RELEASED"
                      ? "bg-green-100 text-green-800"
                      : row.original.status === "UPCOMING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {row.original.status === "RELEASED"
                    ? "Released"
                    : row.original.status === "UPCOMING"
                      ? "Upcoming"
                      : "Cancelled"}
                </span>
              ),
            },
            {
              header: "Runtime",
              accessorKey: "runtime",
              cell: ({ row }) => `${row.original.runtime} mins`,
            },
            {
              header: "Release Date",
              accessorKey: "releaseDate",
              cell: ({ row }) =>
                new Date(row.original.releaseDate).toLocaleDateString(),
            },
          ]}
          data={movie}
          renderActions={(movie) => (
            <>
              <button
                className="text-blue-600 mr-4"
                onClick={() => navigate(`/editMovie/${movie._id}`)}
              >
                <div className="flex items-center gap-2">
                  <Edit2 size={18} />
                  <span>Edit</span>
                </div>
              </button>

              <ConfirmButtonAlert
                className="text-red-600"
                onConfirm={async () => {
                  await deleteMovie(movie._id);
                  await fetchMovies();
                }}
                title="Confirm Deletion"
                description={`Are you sure you want to delete the movie "${movie.title}"? This action cannot be undone.`}
                cancelText="Cancel"
                confirmText="Delete"
              >
                <div className="flex items-center gap-2 text-red-500">
                  <Trash2 size={18} />
                  <span>Delete</span>
                </div>
              </ConfirmButtonAlert>
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

export default Movie;
