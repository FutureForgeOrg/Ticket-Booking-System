import { useEventsQuery } from "../../../hooks/useEventsQuery";
import EventCard from "../../ui/EventCard";
import HorizontalCardList from "../../ui/HorizontalCardList";

export default function NewEvents() {
  const { data: allEvents, isLoading, error } = useEventsQuery();
  return (
    <HorizontalCardList
      title="New Events"
      items={allEvents ?? []}
      scrollAmount={400}
      renderItem={(event) => <EventCard key={event._id} event={event} />}
      loading={isLoading}
      error={error as Error | null}
      showAllLink="/events/all"
    />
  );
}
