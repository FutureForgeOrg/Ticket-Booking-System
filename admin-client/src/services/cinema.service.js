import instance from "@/lib/axios";


export const cinemaApi={
    getAllCinemas:()=>instance.get('/cinemas'),
    getCinemaById:(id)=>instance.get(`/cinemas/${id}`),
    createCinema:(data)=>instance.post('/cinemas',data),
    deleteCinema:(id)=>instance.delete(`/cinemas/${id}`),
    addScreenToCinema:(cinemaId,data)=>instance.post(`/cinemas/${cinemaId}/screens`,data),
}