import { create } from 'zustand';
import { createShow, cancelShow, updateShow, getAllShowsAdmin } from '@/services/show.service';
import toast from 'react-hot-toast';

const useShowStore = create((set, get) => ({
    shows: [],
    loading: false,
    page: 1,
    limit: 8,
    totalPages:1,
    total: 0,
    movies: [],
    cinemas: [],

    filters: {
        movieId: "",
        cinemaId: "",
        status: ""
    },

    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit }),

    setFilters: (filters) => {
        set({ filters, page: 1 });
        get().fetchShows();
    },

    setMovies: (movies) => set({ movies }),
    setCinemas: (cinemas) => set({ cinemas }),



    fetchShows: async () => {
        set({ loading: true });
        const { filters, limit, page } = get()
        const res = await getAllShowsAdmin({
            ...filters,
            limit,
            page
        });
        console.log("filtered data", res);
        set({
            shows: res.data,
            totalPages: res.totalPages,
            total: res.total,
            loading: false
        });
    },

    addShow: async (payload) => {
        await createShow(payload);
        await get().fetchShows();
    },

    editShow: async (id, payload) => {
        await updateShow(id, payload);
        await get().fetchShows();
    },

    cancelShowById: async (id) => {
        await cancelShow(id);
        await get().fetchShows();
    }
}))

export default useShowStore;