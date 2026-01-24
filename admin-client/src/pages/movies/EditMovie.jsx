import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import useMovieStore from "@/store/movie.store";
import { EditMovieForm } from "@/components/movie/EditMovieForm";

function EditMovie() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { current, fetchMovie, updateMovie, clearCurrent } = useMovieStore();

  useEffect(() => {
    fetchMovie(id);
    return () => {
      clearCurrent();
    }
  }, [id, fetchMovie, clearCurrent]);

  const submit = async (data) => {
    await updateMovie(id, data);
    navigate("/movie");
  }

  if (!current) {
    return <div className="p-6">Loading movie...</div>;
  }

  return (
    <> <div className="p-6">
      <EditMovieForm key={current?._id} initialData={current} onSubmit={submit} />
    </div>
    </>
  )
}

export default EditMovie