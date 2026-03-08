import { Link } from "react-router-dom";
import Carousel from "../../ui/Carousel";
import { useFeaturedBanners } from "../../../hooks/useFeaturedBanners";

export default function FeaturedBannerCarousel() {
  const { data: banners = [], isLoading } = useFeaturedBanners();

  if (isLoading)
    return <div className="h-[420px] bg-gray-800 animate-pulse rounded-xl" />;
  return (
    <div className="max-w-7xl mx-auto px-6 pt-2 pb-6">
      <Carousel
        items={banners}
        interval={5000}
        bannerHeight={320}
        renderItem={(banner) => (
          <Link to={banner.link} className="block h-[320px] w-full">
            <img
              src={banner.bannerUrl}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
          </Link>
        )}
      />
    </div>
  );
}
