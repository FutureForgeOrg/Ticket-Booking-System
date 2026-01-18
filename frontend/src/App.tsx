import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MovieDetail from "./pages/MovieDetailPage";
import Layout from "./layout/layout";
import MovieShows from "./pages/MovieShows";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />

        {/* PROTECTED WRAPPER */}
        <Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/movies/:movieId/:city" element={<MovieDetail />} />
              <Route
                path="/movies/:movieId/shows"
                element={<MovieShows />}
              />
            </Route>
          </Route>
        </Route>

        <Route path="/*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
