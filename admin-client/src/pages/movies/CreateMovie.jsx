import { useNavigate } from "react-router-dom"
import useMovieStore from "../../store/movie.store.js"
import MovieForm from "../../components/movie/MovieForm.jsx"

function CreateMovie() {
  const navigate = useNavigate()
  const { createMovie } = useMovieStore()

  const submit = async (data) => {
    await createMovie(data)
    navigate("/Movie")
  }
  return (
    <>
      <div className="p-6">
        <MovieForm onSubmit={submit} />
      </div>
    </>
  )
}

export default CreateMovie