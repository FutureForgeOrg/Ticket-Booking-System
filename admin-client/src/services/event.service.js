import instance from "@/lib/axios";

export const eventApi={
    getAllEvents:(params)=>instance.get('/events',{params}),
    getEventById:(id)=>instance.get(`/events/${id}`),
    createEvent:(data)=>instance.post('/events',data),
    updateEvent:(id,data)=>instance.put(`/events/${id}`,data),
   
}