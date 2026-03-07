export interface FeaturedBanner {
  id: string;
  title: string;
  bannerUrl: string;
  posterUrl: string;
  link: string;
  type: "movie" | "event";
}