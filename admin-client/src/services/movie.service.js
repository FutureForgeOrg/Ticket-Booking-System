import instance from "@/lib/axios";

export const movieApi={
    getAllMovies:(params)=>instance.get('/movies',{params}),
    getMovieById:(id)=>instance.get(`/movies/${id}`),
    createMovie:(data)=>instance.post('/movies',data),
    updateMovie:(id,data)=>instance.put(`/movies/${id}`,data),
    deleteMovie:(id)=>instance.delete(`/movies/${id}`),

}