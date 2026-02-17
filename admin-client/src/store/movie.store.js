import { movieApi } from "../services/movie.service";
import { create } from "zustand";
import toast from "react-hot-toast";

const useMovieStore = create((set, get) => ({
    movie: [],
    current: null,
    loading: false,
    page: 1,
    limit: 8,
    totalPages: 1,
    totalMovies: 0,

    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit }),



    fetchMovies: async () => {
        try {
            set({ loading: true });

            const { page, limit } = get();
            const { data } = await movieApi.getAllMovies({ page, limit });

            set({
                movie: data.data,
                totalPages: data.totalPages,
                totalMovies: data.totalMovies,
                loading: false,
            });
        } catch (err) {
            toast.error("Failed to fetch movies");
            set({ loading: false });
        }
    },


    fetchMovie: async (id) => {
        set({ loading: true, current: null });
        const { data } = await movieApi.getMovieById(id)
        set({ current: data.data, loading: false });
    },

    createMovie: async (payload) => {
        try {
            await movieApi.createMovie(payload);
            toast.success("Movie created successfully!");
        } catch (err) {
            toast.error("Failed to create movie: " + err.message);

        }
    },

    updateMovie: async (id, payload) => {
        try {
            await movieApi.updateMovie(id, payload);
            toast.success("Movie updated successfully!");
        } catch (err) {
            toast.error("Failed to update movie: " + err.message);
        }

    },

    deleteMovie: async (id) => {
        try {
            await movieApi.deleteMovie(id)
            toast.success("Movie deleted successfully!");
        } catch (err) {
            toast.error("Failed to delete movie: " + err.message);
        }

    },

    clearCurrent: () => set({ current: null })

}))

export default useMovieStore;