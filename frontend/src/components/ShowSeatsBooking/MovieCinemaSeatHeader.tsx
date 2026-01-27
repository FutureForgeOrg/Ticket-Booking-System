import type { ShowDetails } from "../../types/showById.type";

const MovieCinemaSeatHeader = ({ show }: { show: ShowDetails }) => {
  return (
    <div className="flex item-center justify-between">
      <div className="">
        <h1 className="text-xl font-normal">{show.movie.title}</h1>
        <p className="text-lg font-medium">
          {show.cinema.name}, {show.cinema.location.city},{" "}
          {show.cinema.location.state}
        </p>
        <p className="text-gray-600">
          Screen: {show.screenName} | Show Time: {new Date(show.showTime).toLocaleString()} -{" "}
          {new Date(show.endTime).toLocaleString()}
        </p>
      </div>

      <div className="text-right">
        total tickets to book option
      </div>
    </div>
  );
};

export default MovieCinemaSeatHeader;
