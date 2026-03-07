import { axiosInstance } from "../lib/axiosInstance";

export const fetchFeaturedBanners = async () => {
  const { data } = await axiosInstance.get("/featured-banners");
  console.log("Fetched featured banners:", data.banners);
  return data.banners;
};
