import NewEvents from "../components/Home/EventsScrollers/NewEvents";
import Footer from "../components/Home/Footer";
import Hero from "../components/Home/Hero";
import HowItWorks from "../components/Home/Info/HowItWorksInfo";
import NewReleaseMovies from "../components/Home/MovieScrollers/NewRelease";
import TrendingMovies from "../components/Home/MovieScrollers/TrendingMovies";
import Navbar from "../components/Home/Navbar/Navbar";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrendingMovies />
      <HowItWorks />
      <NewReleaseMovies />
      <NewEvents />
      <Footer />
    </>
  );
}

export default HomePage;
