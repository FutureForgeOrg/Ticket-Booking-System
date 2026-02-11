export type SeatType = "regular" | "premium" | "vip";

export type ShowSeat = {
  seatId: string;
  row: string;
  number: number;
  type: SeatType;
  isBooked: boolean;
  bookedBy: string | null;
};

export type LayoutBlock =
  | {
      gap: true;
      count: number;
    }
  | {
      gap: false;
      count: number;
      seatType: SeatType;
      seats: ShowSeat[];
    };

export type LayoutRow = {
  row: string;
  blocks: LayoutBlock[];
};

export type ScreenLayout = {
  rowGap: number;
  rows: LayoutRow[];
};

export type ShowByIdData = {
    show: {
      id: string;
      showTime: string;
      endTime: string;
      status: string;
      price: Record<SeatType, number>;
    };
    movie: {
      title: string;
      genres: string[];
      posterUrl: string;
      runtime: number;
    };
    cinema: {
      name: string;
      location: {
        city: string;
        state: string;
      };
    };
    screen: {
      name: string;
      layout: ScreenLayout;
    };
  }

export type ShowByIdResponse = {
  success: boolean;
  data: ShowByIdData;
};
