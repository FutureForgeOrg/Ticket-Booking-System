import instance from "@/lib/axios";

export const cancelTicket = async (ticketId) => {
    console.log(ticketId)
    const response=await instance.post("/tickets/admin/cancel-ticket",{ticketId});
    return response.data;
}

export const fetchTickets=async(params)=>{
    const response=await instance.get("/tickets/admin/fetchTickets",{params});
    return response.data;
    
}