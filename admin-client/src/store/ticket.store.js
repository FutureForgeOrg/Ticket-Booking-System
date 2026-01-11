import { create } from "zustand";
import { cancelTicket, fetchTickets } from "@/services/ticket.service";

const useTicketStore = create((set, get) => ({
    tickets: [],
    total: 0,
    totalPages: 1,
    page: 1,
    limit: 10,
    loading: false,
    filters: {
        status: "",
        movieId:"",
        cinemaId:"",
    },
    movies: [],
    cinemas:[],
    setMovies: (movies) => set({ movies }),
    setCinemas:(cinemas)=>set({cinemas}),
    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit }),

    setFilters: (filters) => {
        set({ filters, page: 1 });

    },


    fetchTickets: async () => {
        set({ loading: true });
        const { filters, limit, page } = get();

        const response = await fetchTickets({ ...filters, page, limit });

        set({
            tickets: response.tickets,
            total: response.total,
            totalPages: Math.ceil(response.total / limit),
            loading: false,
        });
    },


    cancelTicket: async (ticketId) => {
        await cancelTicket(ticketId);
        set((state) => ({
            tickets: state.tickets.map((t) =>
                t._id === ticketId ? { ...t, status: "CANCELLED" } : t
            ),
        }));
    },
}));

export default useTicketStore;
