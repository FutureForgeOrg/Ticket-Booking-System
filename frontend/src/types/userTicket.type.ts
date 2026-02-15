export interface MyTicketsShow {
  id: string;
  movieTitle: string;
  moviePoster: string;
  movieRuntime: number;
  movieGenres: string[];
  cinemaName: string;
  location: string;
  screen: string;
  showTime: string;
  endTime: string;
}

export interface MyTicketsSeat {
  name: string;
  row: string;
  number: number;
  type: "regular" | "premium" | "vip";
}

export interface MyTicketsTicket {
  ticketId: string;
  seats: MyTicketsSeat[];
  totalPrice: number;
  status: "CONFIRMED" | "CANCELLED" | "PENDING";
  bookedAt: string;
}

export interface MyTicketsGroup {
  show: MyTicketsShow;
  tickets: MyTicketsTicket[];
}

export interface MyTicketsResponse {
  success: boolean;
  message: string;
  count: number;
  data: MyTicketsGroup[];
}
