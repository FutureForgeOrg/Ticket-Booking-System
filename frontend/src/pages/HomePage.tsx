import NewEvents from "../components/Home/EventsScrollers/NewEvents";
import TrendingEvents from "../components/Home/EventsScrollers/TrendingEvents";
import FeaturedBannerCarousel from "../components/Home/FeaturedBanners/FeaturedBannerCarousel";
import Footer from "../components/Home/Footer";
import HowItWorks from "../components/Home/Info/HowItWorksInfo";
import NewReleaseMovies from "../components/Home/MovieScrollers/NewRelease";
import TrendingMovies from "../components/Home/MovieScrollers/TrendingMovies";
import Navbar from "../components/Home/Navbar/Navbar";

function HomePage() {
  return (
    <>
      <Navbar />
      {/* <Hero /> */}
      <FeaturedBannerCarousel />
      <TrendingMovies />
      <TrendingEvents />
      <HowItWorks />
      <NewReleaseMovies />
      <NewEvents />
      <Footer />
    </>
  );
}

export default HomePage;
