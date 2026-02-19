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
import BookingList from "./pages/Bookings/bookingList";
import Payment from "./pages/Payment";
import EventList from "./pages/event/EventList";
import CreateEvent from "./pages/event/CreateEvent";
import EditEvent from "./pages/event/EditEvent";
import Rating from "./pages/Rating";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/createMovie" element={<CreateMovie />} />
            <Route path="/editMovie/:id" element={<EditMovie />} />

            <Route path="/cinemaList" element={<CinemaList />} />
            <Route path="/createCinema" element={<CreateCinema />} />
            <Route path="/cinemaDetails/:id" element={<CinemaDetails />} />

            <Route path="/showPage" element={<ShowPage />} />
            <Route path="/createShowForm" element={<CreateShowForm />} />
            <Route path="/editShowForm/:id" element={<EditShowForm />} />
            <Route path="/booking" element={<BookingList />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/event" element={<EventList />} />
            <Route path="/createEvent" element={<CreateEvent />} />
            <Route path="/editEvent/:id" element={<EditEvent />} /> 
            <Route path="/rating" element={<Rating />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
