import { useNavigate } from "react-router-dom"
import PageHeader from "@/components/common/PageHeader"
import CinemaForm from "@/components/cinema/CinemaForm"
import useCinemaStore from "@/store/cinema.store"

function CreateCinema() {
  const { createCinema } = useCinemaStore();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await createCinema(data);
    navigate("/CinemaList");
  };

  return (
    <>
      <PageHeader title="Create Cinema" />
      <CinemaForm onSubmit={handleCreate} />
    </>
  )
}

export default CreateCinema