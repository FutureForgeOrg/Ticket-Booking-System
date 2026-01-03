import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import useMovieStore from "@/store/movie.store";
import MovieForm from "../../components/movie/MovieForm";

function EditMovie() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { current, fetchMovie, updateMovie, clearCurrent } = useMovieStore();

  useEffect(() => {
    fetchMovie(id);
    return () => {
      clearCurrent();
    }
  }, [id]);

  const submit = async (data) => {
    await updateMovie(id, data);
    navigate("/movie");
  }

  if (!current) {
    return <div className="p-6">Loading movie...</div>;
  }

  return (
    <> <div className="p-6">
      <MovieForm initialData={current} onSubmit={submit} />
    </div>
    </>
  )
}

export default EditMovie