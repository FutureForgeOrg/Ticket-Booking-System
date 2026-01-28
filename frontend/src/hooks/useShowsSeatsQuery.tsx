import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";
import type { ShowByIdResponse } from "../types/showById.type";

async function fetchShowSeatsDetails(showId : string): Promise<ShowByIdResponse> {
    const res = await axiosInstance.get(`/shows/${showId}`,{
        withCredentials: true
    });
    return res.data;
}

export function useShowSeatsQuery(showId : string) {
    return useQuery<ShowByIdResponse, Error>({
        queryKey: ["show-seats", showId],
        queryFn: () => fetchShowSeatsDetails(showId),
        enabled: !!showId,
        staleTime: 30_000, // 30 seconds
    });
}
