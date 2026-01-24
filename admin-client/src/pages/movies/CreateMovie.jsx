import { useNavigate } from "react-router-dom"
import useMovieStore from "../../store/movie.store.js"
import { CreateMovieForm } from "@/components/movie/CreateMovieForm.jsx"

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
        <CreateMovieForm onSubmit={submit} />
      </div>
    </>
  )
}

export default CreateMovie