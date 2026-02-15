import type { TicketData } from "../types/ticket.type"; // norml ticket data used in TicketPage
import type { MyTicketsGroup, MyTicketsTicket } from "../types/userTicket.type"; // ticket data as received from /tickets/my-tickets API, needs to be mapped to TicketData

export function mapMyTicketToTicketData(
  group: MyTicketsGroup,
  ticket: MyTicketsTicket,
): TicketData {
  return {
    ticketId: ticket.ticketId,

    movie: {
      title: group.show.movieTitle,
      poster: group.show.moviePoster,
      runtime: group.show.movieRuntime,
      genres: group.show.movieGenres,
    },

    cinema: {
      name: group.show.cinemaName,
      location: group.show.location,
    },

    show: {
      screen: group.show.screen,
      showTime: group.show.showTime,
      endTime: group.show.endTime,
    },

    seats: ticket.seats.map((s) => ({
      seatName: s.name,
      row: s.row,
      number: s.number,
      type: s.type,
    })),

    totalPrice: ticket.totalPrice,
    status: ticket.status,
    bookedAt: ticket.bookedAt,
  };
}
