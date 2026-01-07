import { useState, useEffect } from "react";
import useShowStore from "@/store/show.store";
import ReusableSelect from "@/components/common/ReuableSelect";
import ConfirmButton from "@/components/common/ConfirmButton";
import TextInput from "@/components/common/TextInput";
import { useNavigate } from "react-router-dom";
import { cinemaApi } from "@/services/cinema.service";
import { movieApi } from "@/services/movie.service";

const CreateShowForm = () => {
  const navigate = useNavigate();
  const { addShow, movies, cinemas, setMovies, setCinemas, fetchShows } = useShowStore();

  const [form, setForm] = useState({
    movieId: "",
    cinemaId: "",
    screenName: "",
    showTime: "",
    price: { regular: "", premium: "", vip: "" }
  });

  useEffect(() => {
    async function fetchMoviesAndCinemas() {
      const moviesRes = await movieApi.getAllMovies();
      // Map API data to { label, value } format
      setMovies(
        moviesRes.data.data.map((m) => ({ label: m.title, value: m._id }))
      );

      const cinemasRes = await cinemaApi.getAllCinemas();
      setCinemas(
        cinemasRes.data.data.map((c) => ({ label: c.name, value: c._id, screens: c.screens }))
      );
    }
    fetchMoviesAndCinemas();
  }, []);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updatePrice = (key, value) => {
    setForm((prev) => ({
      ...prev,
      price: { ...prev.price, [key]: value }
    }));
  };

  // Find selected cinema to get screens
  const selectedCinema = cinemas.find((c) => c.value === form.cinemaId);
  const screens = selectedCinema?.screens || [];

  // Map screen objects to { label, value } for select
  const screenOptions = screens.map((screen) => ({
    label: screen.name, // display name
    value: screen.name, // store name in form
  }));

  const handleSubmit = async () => {
    addShow({
      ...form,
      price: {
        regular: Number(form.price.regular),
        premium: Number(form.price.premium),
        vip: Number(form.price.vip)
      }
    });

    await fetchShows();
    navigate("/ShowPage");
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* MOVIE */}
      <ReusableSelect
        label="Movie"
        options={movies}
        value={form.movieId}
        onChange={(v) => update("movieId", v)}
      />

      {/* CINEMA */}
      <ReusableSelect
        label="Cinema"
        options={cinemas}
        value={form.cinemaId}
        onChange={(v) => update("cinemaId", v)}
      />

      {/* SCREEN */}
      <ReusableSelect
        label="Screen"
        options={screenOptions}
        value={form.screenName}
        onChange={(v) => update("screenName", v)}
      />

      <TextInput
        type="datetime-local"
        label="Show Time"
        value={form.showTime}
        onChange={(e) => update("showTime", e.target.value)}
      />

      <TextInput
        type="number"
        label="Regular Price"
        value={form.price.regular}
        onChange={(e) => updatePrice("regular", e.target.value)}
      />

      <TextInput
        type="number"
        label="Premium Price"
        value={form.price.premium}
        onChange={(e) => updatePrice("premium", e.target.value)}
      />

      <TextInput
        type="number"
        label="VIP Price"
        value={form.price.vip}
        onChange={(e) => updatePrice("vip", e.target.value)}
      />

      <div className="col-span-2">
        <ConfirmButton onConfirm={handleSubmit}>Create Show</ConfirmButton>
      </div>
    </div>
  );
};

export default CreateShowForm;
