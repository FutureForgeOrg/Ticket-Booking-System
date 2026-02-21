import { useNavigate } from "react-router-dom";
import useEventStore from "@/store/event.store";
import PageHeader from "@/components/common/PageHeader";
import CreateEventForm from "@/components/event/CreateEventForm";

function CreateEvent() {
  const navigate = useNavigate();
  const { createEvent } = useEventStore();

  const submit = async (data) => {
    await createEvent(data);
    navigate("/event");
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Create Event"
        actionText="Back"
        onAction={() => navigate("/event")}
      />

      <CreateEventForm onSubmit={submit} />
    </div>
  );
}

export default CreateEvent;
