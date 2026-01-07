import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Movie from "./pages/movies/Movie";
import CreateMovie from "./pages/movies/CreateMovie";
import EditMovie from "./pages/movies/EditMovie";
import CinemaList from "./pages/cinema/CinemaList";
import CinemaDetails from "./pages/cinema/CinemaDetails"
import CreateCinema from "./pages/cinema/CreateCinema"
import ShowPage from "./pages/show/ShowPage";
import CreateShowForm from "./pages/show/CreateShowForm";
import EditShowForm from "./pages/show/EditShowForm";
import User from "./pages/User";
import Payment from "./pages/Payment";
import System from "./pages/System";
import Rating from "./pages/Rating";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Movie" element={<Movie />} />
            <Route path="/CreateMovie" element={<CreateMovie />} />
            <Route path="/EditMovie/:id" element={<EditMovie />} />

            <Route path="/CinemaList" element={<CinemaList />} />
            <Route path="/CreateCinema" element={<CreateCinema />} />
            <Route path="/CinemaDetails/:id" element={<CinemaDetails />} />

            <Route path="/ShowPage" element={<ShowPage/>} />
            <Route path="/CreateShowForm" element={<CreateShowForm/>} />
            <Route path="/EditShowForm/:id" element={<EditShowForm/>} />
            <Route path="/User" element={<User />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/System" element={<System />} />
            <Route path="/Rating" element={<Rating />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
