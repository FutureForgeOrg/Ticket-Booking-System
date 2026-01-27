export type SeatType = "regular" | "premium" | "vip";

export type SeatCell =
  | { kind: "gap"; size?: number }
  | {
      kind: "seat";
      seatId: string;
      row: string;
      number: number;
      type: "regular" | "premium" | "vip";
      isBooked: boolean;
    };

export type SeatRow = {
  row: string;
  cells: SeatCell[];
};

export type CinemaMeta = {
  _id: string;
  name: string;
  location: {
    name: string;
    city: string;
    state: string;
  };
};

export type MovieMeta = {
  _id: string;
  title: string;
  genres: string[];
};

export type ShowDetails = {
  showId: string;
  showTime: string;
  endTime: string;
  status: string;
  cinema: CinemaMeta;
  movie: MovieMeta;
  screenName: string;
  rowGap: number;
  rows: SeatRow[];
};

export type ShowSeatsResponse = {
  success: boolean;
  data: ShowDetails;
};
