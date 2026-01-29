import { ArrowLeft } from "lucide-react";
import type { ShowByIdData } from "../../types/showById.type";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const MovieCinemaSeatHeader = ({ show }: { show: ShowByIdData }) => {
  const navigate = useNavigate();
  return (
    <div className="flex item-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft
            size={24}
            className="hover:cursor-pointer transform hover:scale-110"
          />
        </button>
        <div>
          <h1 className="text-lg font-normal">
            {show.movie.title} - {show.cinema.name}, {show.cinema.location.city}
            , {show.cinema.location.state}
          </h1>
          <p className="text-sm font-medium">
            {show.screen.name} | {new Date(show.show.showTime).toDateString()} :{" "}
            {new Date(show.show.showTime)
              .toLocaleTimeString()
              .split(":")
              .slice(0, 2)
              .join(":")}
            {/* for am and pm */}{" "}
            {new Date(show.show.showTime).toLocaleTimeString().split(" ")[1]}
          </p>
        </div>
      </div>

      <Button variant="outline" onClick={() => navigate(-1)}>
        2 Tickets
      </Button>
    </div>
  );
};

export default MovieCinemaSeatHeader;
