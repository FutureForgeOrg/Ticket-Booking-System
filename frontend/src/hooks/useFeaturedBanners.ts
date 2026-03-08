import { useQuery } from "@tanstack/react-query";
import type { FeaturedBanner } from "../types/featuredBanner.type";
import { fetchFeaturedBanners } from "../api/featuredBanners.api";

export function useFeaturedBanners() {
  return useQuery<FeaturedBanner[]>({
    queryKey: ["featured-banners"],
    queryFn: fetchFeaturedBanners,
  });
}
