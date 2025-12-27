import Footer from "./components/Home/Footer";
import Hero from "./components/Home/Hero";
import HowItWorks from "./components/Home/Info/HowItWorksInfo";
import Navbar from "./components/Home/Navbar";
import TrendingMovies from "./components/Home/MovieScrollers/TrendingMovies";
// import NewReleaseMovies from "./components/Home/MovieScrollers/NewRelease";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrendingMovies />
      <HowItWorks />
      {/* <NewReleaseMovies /> */}
      <Footer />
    </>
  );
}

export default App;
