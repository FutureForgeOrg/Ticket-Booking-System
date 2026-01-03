import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useMovieStore from "@/store/movie.store"
import PageHeader from "@/components/common/PageHeader"
import DataTable from "@/components/common/DataTable"
import ConfirmButton from "@/components/common/ConfirmButton"

function Movie() {
  const navigate = useNavigate()
  const { movie, fetchMovies, deleteMovie } = useMovieStore()
  useEffect(() => {
    fetchMovies()
    console.log(movie)
  }, [])

  return (
    <>
      <div className="p-6">
        <PageHeader
          title="Movies"
          actionText="Add Movie"
          onAction={() => navigate("/CreateMovie")}
        />
        <DataTable
          columns={["title", "status", "runtime", "releaseDate"]}
          data={movie}
          renderActions={(movie) => (
            <>
              <button
                className="text-blue-600 mr-4"
                onClick={() => navigate(`/EditMovie/${movie._id}`)}
              >
                Edit
              </button>
              <ConfirmButton
                className="text-red-600"
                message={`Are you sure you want to delete the movie "${movie.title}"?`}
                onConfirm={async () => {
                  await deleteMovie(movie._id)
                  await fetchMovies()
                }}
              >
                Delete
              </ConfirmButton>
            </>
          )}
        />
      </div>
    </>
  )
}

export default Movie