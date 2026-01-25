import { create } from 'zustand';
import { createShow, cancelShow, updateShow, getAllShowsAdmin } from '@/services/show.service';
import toast from 'react-hot-toast';

const useShowStore = create((set, get) => ({
    shows: [],
    loading: false,
    isCreatingShow: false,
    page: 1,
    limit: 8,
    totalPages: 1,
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
        // console.log("filtered data", res);
        set({
            shows: res.data,
            totalPages: res.totalPages,
            total: res.total,
            loading: false
        });
    },

    addShow: async (payload) => {
        const { isCreatingShow } = get();

        //  Block duplicate call
        if (isCreatingShow) return;

        try {
            set({ isCreatingShow: true });

            await createShow(payload);
            toast.success("Show created successfully");
            await get().fetchShows();

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to create show"
            );
        } finally {
            set({ isCreatingShow: false });
        }
    },


    editShow: async (id, payload) => {
        try {
            await updateShow(id, payload);
            toast.success("Show updated successfully");
            await get().fetchShows();
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to update show");
        }
    },

    cancelShowById: async (id) => {

        try {
            await cancelShow(id);
            toast.success("Show cancelled successfully");
            await get().fetchShows();
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to cancel show");
        }
    }
}))

export default useShowStore;