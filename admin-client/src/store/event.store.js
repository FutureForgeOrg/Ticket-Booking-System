import { create } from "zustand";
import toast from "react-hot-toast";
import { eventApi } from "@/services/event.service";

const useEventStore = create((set, get) => ({
  events: [],
  current: null,
  loading: false,
  page: 1,
  limit: 8,
  totalPages: 1,
  totalEvents: 0,

  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),

  //  Fetch All Events
  fetchEvents: async () => {
    try {
      set({ loading: true });

      const { page, limit } = get();
      const { data } = await eventApi.getAllEvents({ page, limit });

      set({
        events: data.events,
        totalPages: data.totalPages,
        totalEvents: data.total,
        loading: false,
      });
    } catch (err) {
      toast.error("Failed to fetch events");
      set({ loading: false });
    }
  },

  //  Fetch Single Event
  fetchEvent: async (id) => {
    try {
      set({ loading: true, current: null });

      const { data } = await eventApi.getEventById(id);

      set({
        current: data.event,
        loading: false,
      });
    } catch (err) {
      toast.error("Failed to fetch event");
      set({ loading: false });
    }
  },

  //  Create Event
  createEvent: async (payload) => {
    try {
        console.log("Creating event with payload:", payload);
      await eventApi.createEvent(payload);
      toast.success("Event created successfully!");
      get().fetchEvents();
    } catch (err) {
      toast.error("Failed to create event: " + err.message);
    }
  },

  //  Update Event
  updateEvent: async (id, payload) => {
    try {

      await eventApi.updateEvent(id, payload);
      toast.success("Event updated successfully!");
      get().fetchEvents();
    } catch (err) {
      toast.error("Failed to update event: " + err.message);
    }
  },

  clearCurrent: () => set({ current: null }),
}));

export default useEventStore;
