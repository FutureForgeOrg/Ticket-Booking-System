import instance from "@/lib/axios";

export const cancelTicket = async (ticketId) => {
    const response=await instance.post("/tickets/admin/cancel-ticket",{ticketId});
    return response.data;
}

export const fetchTickets=async(params)=>{
    const respose=await instance.get("/tickets/admin/fetchTickets",{params});
    return respose.data;
}