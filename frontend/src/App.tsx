import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MovieDetail from "./pages/MovieDetailPage";
import Layout from "./layout/layout";
import MovieShows from "./pages/MovieShows";
import MovieShowSeats from "./pages/MovieShowSeats";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

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
            <Route path="/movies/:movieId/:city" element={<MovieDetail />} />
            <Route path="/movies/:movieId/shows" element={<MovieShows />} />
            <Route path="/show/:showId" element={<MovieShowSeats />} />
            <Route
              path="/booking-success/:ticketId"
              element={
                <h1>Booking Success (later will create api from backend)</h1>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
