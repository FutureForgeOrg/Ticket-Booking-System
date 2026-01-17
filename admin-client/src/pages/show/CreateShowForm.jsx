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
    price: { regular: "10", premium: "20", vip: "30" }
  });

  useEffect(() => {
    async function fetchMoviesAndCinemas() {
      const moviesRes = await movieApi.getAllMovies();
      setMovies(moviesRes.data.data.map((m) => ({ label: m.title, value: m._id })));

      const cinemasRes = await cinemaApi.getAllCinemas();
      setCinemas(
        cinemasRes.data.data.map((c) => ({ label: c.name, value: c._id, screens: c.screens }))
      );
    }
    fetchMoviesAndCinemas();
  }, []);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const updatePrice = (key, value) =>
    setForm((prev) => ({ ...prev, price: { ...prev.price, [key]: value } }));

  const selectedCinema = cinemas.find((c) => c.value === form.cinemaId);
  const screens = selectedCinema?.screens || [];
  const screenOptions = screens.map((screen) => ({ label: screen.name, value: screen.name }));

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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Create New Show</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* MOVIE */}
        <ReusableSelect
          label="Movie"
          options={movies}
          value={form.movieId}
          onChange={(v) => update("movieId", v)}
          className="w-full"
        />

        {/* CINEMA */}
        <ReusableSelect
          label="Cinema"
          options={cinemas}
          value={form.cinemaId}
          onChange={(v) => update("cinemaId", v)}
          className="w-full"
        />

        {/* SCREEN */}
        <ReusableSelect
          label="Screen"
          options={screenOptions}
          value={form.screenName}
          onChange={(v) => update("screenName", v)}
          className="w-full"
          emptyMessage="Select Cinema first for available screens"
        />

        {/* SHOW TIME */}
        <TextInput
          type="datetime-local"
          label="Show Time"
          value={form.showTime}
          onChange={(e) => update("showTime", e.target.value)}
          className="w-full"
        />

        {/* PRICE FIELDS */}
        <TextInput
          type="number"
          label="Regular Price"
          value={form.price.regular}
          onChange={(e) => updatePrice("regular", e.target.value)}
          className="w-full"
        />

        <TextInput
          type="number"
          label="Premium Price"
          value={form.price.premium}
          onChange={(e) => updatePrice("premium", e.target.value)}
          className="w-full"
        />

        <TextInput
          type="number"
          label="VIP Price"
          value={form.price.vip}
          onChange={(e) => updatePrice("vip", e.target.value)}
          className="w-full"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <ConfirmButton
          onConfirm={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow"
        >
          Create Show
        </ConfirmButton>
      </div>
    </div>
  );
};

export default CreateShowForm;
