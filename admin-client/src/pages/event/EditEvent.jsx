import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEventStore from "@/store/event.store";
import PageHeader from "@/components/common/PageHeader";
import EditEventForm from "@/components/event/EditEventForm";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { current, fetchEvent, updateEvent, clearCurrent } = useEventStore();

  useEffect(() => {
    fetchEvent(id);
    return () => clearCurrent();
  }, [id]);

  const submit = async (data) => {
    await updateEvent(id, data);
    navigate("/event");
  };

  if (!current) return <div className="p-8">Loading event...</div>;

  return (
    <div className="p-8">
      <PageHeader
        title="Edit Event"
        actionText="Back"
        onAction={() => navigate("/event")}
      />

      <EditEventForm
        key={current?._id}
        initialData={current}
        onSubmit={submit}
      />
    </div>
  );
}

export default EditEvent;
