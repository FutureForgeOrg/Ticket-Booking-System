import ConfirmButton from "@/components/common/ConfirmButton"
import EditShowForm from "./EditShowForm"
import useShowStore from "@/store/show.store"
import { useNavigate } from "react-router-dom";
function ShowActions({ show }) {
  const navigate = useNavigate();
  const { cancelShowById } = useShowStore();

  if (show.status === "CANCELLED") {
    return <span className="text-gray-400">No actions</span>;
  }

  return (
    <>
      <div className="flex gap-2">

        <button className="btn btn-sm btn-primary"
          onClick={() => navigate(`/editShowForm/${show._id}`, { state: { show } })}>
          Edit
        </button>

        <ConfirmButton variant="destructive"
          onConfirm={() => cancelShowById(show._id)}>cancel</ConfirmButton>
      </div>
    </>
  )
}

export default ShowActions;