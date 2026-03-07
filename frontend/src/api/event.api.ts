import { axiosInstance } from "../lib/axiosInstance";

export const fetchEvents = async () => {
  const { data } = await axiosInstance.get("/events");
  return data.events;
};
