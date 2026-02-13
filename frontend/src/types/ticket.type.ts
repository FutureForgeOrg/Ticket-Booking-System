export interface Movie {
  title: string;
  poster: string;
  runtime: number;
  genres: string[];
}

export interface Cinema {
  name: string;
  location: string;
}

export interface Show {
  screen: string;
  showTime: string; 
  endTime: string;  
}

export interface Seat {
  seatName: string;
  row: string;
  number: number;
  type: "regular" | "premium" | "vip";
}

export interface TicketData {
  ticketId: string;
  movie: Movie;
  cinema: Cinema;
  show: Show;
  seats: Seat[];
  totalPrice: number;
  status: "CONFIRMED" | "CANCELLED" | "PENDING";
  bookedAt: string; 
}

export interface TicketResponse {
  success: boolean;
  message: string;
  data: TicketData;
}
