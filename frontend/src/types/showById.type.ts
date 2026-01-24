export type SeatType = "regular" | "premium" | "vip";

export type ShowSeat = {
  _id: string;
  row: string;
  number: number;
  type: SeatType;
  isBooked: boolean;
  bookedBy: string | null;
};

export type ShowPrice = {
  regular: number;
  premium: number;
  vip: number;
};

export type ShowByIdResponse = {
  success: boolean;
  data: {
    _id: string;
    screenName: string;
    showTime: string;
    endTime: string;
    status: "ACTIVE" | "COMPLETED" | "CANCELLED";
    price: ShowPrice;

    movie: { _id: string; title: string; genres: string[] };
    cinema: {
      _id: string;
      name: string;
      location: { name: string; city: string; state: string };
    };

    seats: ShowSeat[];
  };
};
