import instance from "@/lib/axios";

export const getAllShowsAdmin = async (filters) => {
    const response = await instance.get("/shows/admin/all",{
        params: filters
    });
    return response.data;
}

export const createShow = async (showData) => {
    const response = await instance.post("/shows", showData);
    return response.data;
}

export const updateShow = async (id, showData) => {
    const response = await instance.put(`/shows/${id}`, showData);
    return response.data;
}

export const cancelShow = async (id) => {
    const response = await instance.put(`/shows/cancel/${id}`);
    return response.data;
}


