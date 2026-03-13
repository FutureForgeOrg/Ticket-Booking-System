import { useTrendingEventsQuery } from "../../../hooks/useTrendingEventsQuery";
import EventCard from "../../ui/EventCard";
import HorizontalCardList from "../../ui/HorizontalCardList";

export default function TrendingEvents() {
  const { data: trendingEvents, isLoading, error } = useTrendingEventsQuery();
  return (
    <HorizontalCardList
      title="Trending Events"
      items={trendingEvents ?? []}
      scrollAmount={400}
      renderItem={(event) => <EventCard key={event._id} event={event} />}
      loading={isLoading}
      error={error as Error | null}
      showAllLink="/events/all"
    />
  );
}