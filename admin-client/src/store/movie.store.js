import { movieApi } from "../services/movie.service";
import { create } from "zustand";
import toast from "react-hot-toast";

const useMovieStore = create((set) => ({
    movie: [],
    current: null,
    loading: false,

    fetchMovies: async () => {
        set({ loading: true });
        const { data } = await movieApi.getAllMovies();
        set({ movie: data.data, loading: false });
    },

    fetchMovie: async (id) => {
        set({ loading: true });
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

    clearCurrent: () => ({ current: null })

}))

export default useMovieStore;