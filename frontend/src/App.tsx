import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MovieDetail from "./pages/MovieDetailPage";
import Layout from "./layout/layout";
import MovieShows from "./pages/MovieShows";
import MovieShowSeats from "./pages/MovieShowSeats";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import TicketPage from "./pages/TicketPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import AllMoviesPage from "./pages/AllMoviesPage";
import EventDetailPage from "./pages/EventDetailPage";
import AllEventsPage from "./pages/AllEventsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/movies/all" element={<AllMoviesPage />} />
            <Route path="/events/all" element={<AllEventsPage />} />
            <Route path="/movies/:movieId" element={<MovieDetail />} />
            <Route path="/movies/:movieId/shows" element={<MovieShows />} />
            <Route path="/show/:showId" element={<MovieShowSeats />} />
            <Route path="/my-tickets" element={<MyTicketsPage />} />
            <Route path="/events/:eventId" element={<EventDetailPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/booking-success/:ticketId" element={<TicketPage />} />
        </Route>

        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
