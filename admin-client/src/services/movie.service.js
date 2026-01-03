import instance from "@/lib/axios";

export const movieApi={
    getAllMovies:()=>instance.get('/movies'),
    getMovieById:(id)=>instance.get(`/movies/${id}`),
    createMovie:(data)=>instance.post('/movies',data),
    updateMovie:(id,data)=>instance.put(`/movies/${id}`,data),
    deleteMovie:(id)=>instance.delete(`/movies/${id}`),

}