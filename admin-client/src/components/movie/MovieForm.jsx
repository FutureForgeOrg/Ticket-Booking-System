import { useState } from "react";
import { Button } from "../ui/button";
import TextInput from "../common/TextInput";
import FileInput from "../common/FileInput";


function MovieForm({ initialData = {}, onSubmit }) {
    const [form, setForm] = useState({
        title: initialData.title || "",
        releaseDate: initialData.releaseDate?.slice(0, 10) || "",
        runtime: initialData.runtime || "",
        genres: initialData.genres?.join(", ") || "",
        director: initialData.director || "",
        actors: initialData.actors || "",
        plot: initialData.plot || "",
        trailerUrl: initialData.trailerUrl || "",
        posterUrl: initialData.posterUrl || "",
        bannerUrl: initialData.bannerUrl || ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("releaseDate", form.releaseDate);
        formData.append("runtime", Number(form.runtime));
        //send genres as array
        const genresArray = form.genres.split(",").map(genre => genre.trim());
        formData.append("genres", JSON.stringify(genresArray));

        formData.append("director", form.director);
        formData.append("actors", form.actors);
        formData.append("plot", form.plot);
        formData.append("trailerUrl", form.trailerUrl);
        if (form.poster) {
            formData.append("poster", form.poster);
        }
        if (form.banner) {
            formData.append("banner", form.banner);
        }
        onSubmit(formData);
    };

    const handleFileChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.files[0], // IMPORTANT
        }));
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">

                <TextInput label="Title" name="title" value={form.title} onChange={handleChange} />

                <TextInput
                    label="Release Date"
                    type="date"
                    name="releaseDate"
                    value={form.releaseDate}
                    onChange={handleChange}
                />

                <TextInput
                    label="Runtime (minutes)"
                    name="runtime"
                    value={form.runtime}
                    onChange={handleChange}
                />

                <TextInput
                    label="Genres (comma separated)"
                    name="genres"
                    value={form.genres}
                    onChange={handleChange}
                />

                <TextInput
                    label="Director"
                    name="director"
                    value={form.director}
                    onChange={handleChange}
                />

                <TextInput
                    label="Actors"
                    name="actors"
                    value={form.actors}
                    onChange={handleChange}
                />

                <div className="space-y-1">
                    <label className="text-sm font-medium">Plot</label>
                    <textarea
                        name="plot"
                        value={form.plot}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 min-h-[100px]"
                    />
                </div>

                <TextInput
                    label="Trailer URL"
                    name="trailerUrl"
                    value={form.trailerUrl}
                    onChange={handleChange}
                />
                <FileInput
                    label="Poster Image"
                    name="poster"
                    onChange={handleFileChange}
                    value={form.posterUrl}
                />

                <FileInput
                    label="Banner Image"
                    name="banner"
                    onChange={handleFileChange}
                    value={form.bannerUrl}
                />

                <Button type="submit">Save Movie</Button>
            </form>
        </>
    )
}

export default MovieForm