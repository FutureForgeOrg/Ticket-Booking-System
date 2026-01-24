import { useState } from "react";
import { Button } from "../ui/button";
import TextInput from "../common/TextInput";
import FileInput from "../common/FileInput";
import ReusableSelect from "../common/ReuableSelect";

export function CreateMovieForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    releaseDate: "",
    runtime: "",
    status: "UPCOMING",
    genres: "",
    director: "",
    actors: "",
    plot: "",
    trailerUrl: "",
    poster: null,
    banner: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFile = (name, file) => {
    setForm((p) => ({ ...p, [name]: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("releaseDate", form.releaseDate);
    fd.append("runtime", String(Number(form.runtime)));

    const genresArray = form.genres.split(",").map((g) => g.trim()).filter(Boolean);
    fd.append("genres", JSON.stringify(genresArray));

    fd.append("status", form.status);
    fd.append("director", form.director);
    fd.append("actors", form.actors);
    fd.append("plot", form.plot);
    fd.append("trailerUrl", form.trailerUrl);

    if (form.poster) fd.append("poster", form.poster);
    if (form.banner) fd.append("banner", form.banner);

    onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <TextInput label="Title" name="title" value={form.title} onChange={handleChange} />
      <TextInput label="Release Date" type="date" name="releaseDate" value={form.releaseDate} onChange={handleChange} />
      <TextInput label="Runtime (minutes)" name="runtime" value={form.runtime} onChange={handleChange} />
      <TextInput label="Genres (comma separated)" name="genres" value={form.genres} onChange={handleChange} />

      <ReusableSelect
        label="Status"
        name="status"
        value={form.status}
        onChange={(value) => setForm((p) => ({ ...p, status: value }))}
        options={[
          { value: "UPCOMING", label: "Upcoming" },
          { value: "RELEASED", label: "Released" },
          { value: "CANCELLED", label: "Cancelled" },
        ]}
        className="w-[50%]"
      />

      <TextInput label="Director" name="director" value={form.director} onChange={handleChange} />
      <TextInput label="Actors" name="actors" value={form.actors} onChange={handleChange} />

      <div className="space-y-1">
        <label className="text-sm font-medium">Plot</label>
        <textarea
          name="plot"
          value={form.plot}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 min-h-[100px]"
        />
      </div>

      <TextInput label="Trailer URL" name="trailerUrl" value={form.trailerUrl} onChange={handleChange} />

      <FileInput label="Poster Image" name="poster" onChange={handleFile} />
      <FileInput label="Banner Image" name="banner" onChange={handleFile} />

      <Button type="submit">Create Movie</Button>
    </form>
  );
}
