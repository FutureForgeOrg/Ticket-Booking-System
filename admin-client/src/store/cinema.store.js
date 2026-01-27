import { create } from 'zustand';
import { cinemaApi } from '@/services/cinema.service';
import toast from 'react-hot-toast';

const useCinemaStore = create((set, get) => ({
    cinemas: [],
    currentCinema: null,
    loading: false,
    page: 1,
    limit: 8,
    totalPages: 1,
    total: 0,

    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit }),

    getAllCinemas: async () => {
        set({ loading: true });
        try {
            const { limit, page } = get()

            const response = await cinemaApi.getAllCinemas({
                limit, page
            });
            set({
                cinemas: response.data.data,
                totalPages: response.totalPages,
                total: response.total
            });

        } catch (error) {
            console.error('Failed to fetch cinemas:', error);
            toast.error('Failed to fetch cinemas');

        } finally {
            set({ loading: false });
        }
    },

    getCinemaById: async (id) => {
        set({ loading: true })
        try {
            const response = await cinemaApi.getCinemaById(id);
            set({ currentCinema: response.data.data });

        } catch (error) {
            console.error("failed to fetch cinema")
            toast.error('Failed to fetch cinema');
        } finally {
            set({ loading: false });
        }
    },

    createCinema: async (data) => {
        try {
            console.log(data)
            await cinemaApi.createCinema(data)
            toast.success("cinema created succesfully")
        } catch (error) {
            console.error("failed to craete cinema")
            toast.error("failed to create cinema")
        }
    },

    deleteCinema: async (id) => {
        try {
            await cinemaApi.deleteCinema(id);
            toast.success("cinema deleted successfully")
        } catch (error) {
            console.error("failed to delete cinema")
            toast.error("failed to delete cinema")
        }
    },

    addScreenToCinema: async (id, data) => {
        console.log(data)
        try {
            await cinemaApi.addScreenToCinema(id, data)
            toast.success("successfully added scrren")
        } catch (error) {
            console.error("failed to add screen")
            toast.error("failed to add screen")
        }
    },

    clearCurrent: () => set({ currentCinema: null })

}))

export default useCinemaStore;