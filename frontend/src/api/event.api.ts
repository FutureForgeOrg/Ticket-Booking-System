import { axiosInstance } from "../lib/axiosInstance";

export const fetchEvents = async () => {
  const { data } = await axiosInstance.get("/events");
  return data.events;
};

export const fetchEventById = async (eventId: string) => {
  const { data } = await axiosInstance.get(`/events/${eventId}`);
  return data.event;
};
