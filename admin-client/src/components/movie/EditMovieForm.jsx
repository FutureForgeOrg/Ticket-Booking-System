// import { useState } from "react";
// import { Button } from "../ui/button";
// import TextInput from "../common/TextInput";
// import FileInput from "../common/FileInput";
// import ReusableSelect from "../common/ReuableSelect";
// import toast from "react-hot-toast";

// export function EditMovieForm({ initialData, onSubmit }) {
//   const [form, setForm] = useState({
//     title: initialData.title || "",
//     releaseDate: initialData.releaseDate?.slice(0, 10) || "",
//     runtime: initialData.runtime || "",
//     status: initialData.status || "UPCOMING",
//     genres: initialData.genres?.join(", ") || "",
//     director: initialData.director || "",
//     actors: initialData.actors || "",
//     plot: initialData.plot || "",
//     trailerUrl: initialData.trailerUrl || "",
//   });

//   const [files, setFiles] = useState({ poster: null, banner: null });

//   const handleChange = (e) =>
//     setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

//   const handleFile = (name, file) => setFiles((p) => ({ ...p, [name]: file }));

//   const CompareUpadtedFiedlds = (initial, updated) => {
//     const changed = {};

//     for (const changedFields in updated) {
//       if (changedFields === "genres") {
//         const initialGenres = initial.genres ?? [];

//         const updatedGenres = String(updated.genres ?? "")
//           .split(",")
//           .map((g) => g.trim())
//           .filter(Boolean);

//         if (JSON.stringify(initialGenres) !== JSON.stringify(updatedGenres)) {
//             console.log("Genres changed from", initialGenres, "to", updatedGenres);
//           changed.genres = updatedGenres;
//         }
//         continue;
//       }

//       if (changedFields === "releaseDate") {
//         const initialDate = initial.releaseDate ? initial.releaseDate.slice(0, 10) : "";
//         const updatedDate = updated.releaseDate ? updated.releaseDate.slice(0, 10) : "";
//         if (initialDate !== updatedDate) {
//             console.log("Release Date changed from", initialDate, "to", updatedDate);
//           changed.releaseDate = updatedDate;
//         }
//         continue;
//     }
//      // rn this is of no use as form not contains banner and poster fields , here we have seperately handled file inputs with use state
//       if (typeof updated[changedFields] === File) {
//         if (updated[changedFields] !== null) {
//           changed[changedFields] = updated[changedFields];
//         }
//       } else if (initial[changedFields] !== updated[changedFields]) {
//         changed[changedFields] = updated[changedFields];
//       }
//     }

//     console.log("Changed Fields:", changed);
//     return changed;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const fd = new FormData();

//     // compare and append only changed fields
//     const changedData = CompareUpadtedFiedlds(initialData, form);
//     console.log("Initial Data:", initialData);
//     console.log("Form Data:", form);
//     console.log("Changed Data:", changedData);
//     if (Object.keys(changedData).length === 0 && !files.poster && !files.banner) {
//       toast.error("No changes made to update.");
//       return;
//     }

//      if (files.poster) {
//       changedData.poster = files.poster;
//     }
//     if (files.banner) {
//         changedData.banner = files.banner;
//     }

//     for (const key in changedData) {
//       switch (key) {
//         case "genres": {
//           const genresArray = changedData[key]
//             .split(",")
//             .map((g) => g.trim())
//             .filter(Boolean);
//           fd.append("genres", JSON.stringify(genresArray));
//           break;
//         }

//         case "poster":
//         case "banner": {
//           if (files[key]) {
//             fd.append(key, files[key]);
//           }
//           break;
//         }
//         default:
//           fd.append(key, changedData[key]);
//       }
//     }
//     onSubmit(fd);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
//       <TextInput
//         label="Title"
//         name="title"
//         value={form.title}
//         onChange={handleChange}
//       />
//       <TextInput
//         label="Release Date"
//         type="date"
//         name="releaseDate"
//         value={form.releaseDate}
//         onChange={handleChange}
//       />
//       <TextInput
//         label="Runtime (minutes)"
//         name="runtime"
//         value={form.runtime}
//         onChange={handleChange}
//       />
//       <TextInput
//         label="Genres (comma separated)"
//         name="genres"
//         value={form.genres}
//         onChange={handleChange}
//       />

//       <ReusableSelect
//         label="Status"
//         name="status"
//         value={form.status}
//         onChange={(v) => setForm((p) => ({ ...p, status: v }))}
//         options={[
//           { value: "UPCOMING", label: "Upcoming" },
//           { value: "RELEASED", label: "Released" },
//           { value: "CANCELLED", label: "Cancelled" },
//         ]}
//         className="w-[50%]"
//       />

//       <TextInput
//         label="Director"
//         name="director"
//         value={form.director}
//         onChange={handleChange}
//       />
//       <TextInput
//         label="Actors"
//         name="actors"
//         value={form.actors}
//         onChange={handleChange}
//       />

//       <div className="space-y-1">
//         <label className="text-sm font-medium">Plot</label>
//         <textarea
//           name="plot"
//           value={form.plot}
//           onChange={handleChange}
//           className="w-full border rounded-md px-3 py-2 min-h-[100px]"
//         />
//       </div>

//       <TextInput
//         label="Trailer URL"
//         name="trailerUrl"
//         value={form.trailerUrl}
//         onChange={handleChange}
//       />

//       <FileInput
//         label="Poster Image"
//         name="poster"
//         value={initialData.posterUrl} // show existing
//         onChange={handleFile} // selecting new will override
//       />

//       <FileInput
//         label="Banner Image"
//         name="banner"
//         value={initialData.bannerUrl}
//         onChange={handleFile}
//       />

//       <Button type="submit">Update Movie</Button>
//     </form>
//   );
// }


import { useState } from "react";
import { Button } from "../ui/button";
import TextInput from "../common/TextInput";
import FileInput from "../common/FileInput";
import ReusableSelect from "../common/ReuableSelect";
import toast from "react-hot-toast";

export function EditMovieForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    releaseDate: initialData.releaseDate?.slice(0, 10) || "",
    runtime: initialData.runtime || "",
    status: initialData.status || "UPCOMING",
    genres: initialData.genres?.join(", ") || "",
    director: initialData.director || "",
    actors: initialData.actors || "",
    plot: initialData.plot || "",
    trailerUrl: initialData.trailerUrl || "",
  });

  const [files, setFiles] = useState({ poster: null, banner: null });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFile = (name, file) => setFiles((p) => ({ ...p, [name]: file }));

  const CompareUpadtedFiedlds = (initial, updated) => {
    const changed = {};

    for (const changedFields in updated) {
      if (changedFields === "genres") {
        const initialGenres = initial.genres ?? [];

        const updatedGenres = String(updated.genres ?? "")
          .split(",")
          .map((g) => g.trim())
          .filter(Boolean);

        if (JSON.stringify(initialGenres) !== JSON.stringify(updatedGenres)) {
            console.log("Genres changed from", initialGenres, "to", updatedGenres);
          changed.genres = updatedGenres;
        }
        continue;
      }

      if (changedFields === "releaseDate") {
        const initialDate = initial.releaseDate ? initial.releaseDate.slice(0, 10) : "";
        const updatedDate = updated.releaseDate ? updated.releaseDate.slice(0, 10) : "";
        if (initialDate !== updatedDate) {
            console.log("Release Date changed from", initialDate, "to", updatedDate);
          changed.releaseDate = updatedDate;
        }
        continue;
    }
     // rn this is of no use as form not contains banner and poster fields , here we have seperately handled file inputs with use state
      if (typeof updated[changedFields] === File) {
        if (updated[changedFields] !== null) {
          changed[changedFields] = updated[changedFields];
        }
      } else if (initial[changedFields] !== updated[changedFields]) {
        changed[changedFields] = updated[changedFields];
      }
    }

    console.log("Changed Fields:", changed);
    return changed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();

    // compare and append only changed fields
    const changedData = CompareUpadtedFiedlds(initialData, form);
    console.log("Initial Data:", initialData);
    console.log("Form Data:", form);
    console.log("Changed Data:", changedData);
    if (Object.keys(changedData).length === 0 && !files.poster && !files.banner) {
      toast.error("No changes made to update.");
      return;
    }

     if (files.poster) {
      changedData.poster = files.poster;
    }
    if (files.banner) {
        changedData.banner = files.banner;
    }

    for (const key in changedData) {
      switch (key) {
        case "genres": {
          const genresArray = changedData[key]
            .split(",")
            .map((g) => g.trim())
            .filter(Boolean);
          fd.append("genres", JSON.stringify(genresArray));
          break;
        }

        case "poster":
        case "banner": {
          if (files[key]) {
            fd.append(key, files[key]);
          }
          break;
        }
        default:
          fd.append(key, changedData[key]);
      }
    }
    onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <TextInput label="Title" name="title" value={form.title} onChange={handleChange} />
        <TextInput label="Release Date" type="date" name="releaseDate" value={form.releaseDate} onChange={handleChange} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput label="Runtime (minutes)" name="runtime" value={form.runtime} onChange={handleChange} />
        <TextInput label="Genres (comma separated)" name="genres" value={form.genres} onChange={handleChange} />
      </div>

      <ReusableSelect
        label="Status"
        name="status"
        value={form.status}
        onChange={(v) => setForm((p) => ({ ...p, status: v }))}
        options={[
          { value: "UPCOMING", label: "Upcoming" },
          { value: "RELEASED", label: "Released" },
          { value: "CANCELLED", label: "Cancelled" },
        ]}
        className="w-[50%]"
      />

      <div className="grid grid-cols-2 gap-4">
        <TextInput label="Director" name="director" value={form.director} onChange={handleChange} />
        <TextInput label="Actors" name="actors" value={form.actors} onChange={handleChange} />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">Plot</label>
        <textarea
          name="plot"
          value={form.plot}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 min-h-[100px] resize-y transition"
        />
      </div>

      <TextInput label="Trailer URL" name="trailerUrl" value={form.trailerUrl} onChange={handleChange} />

      <div className="grid grid-cols-2 gap-4">
        <FileInput label="Poster Image" name="poster" value={initialData.posterUrl} onChange={handleFile} />
        <FileInput label="Banner Image" name="banner" value={initialData.bannerUrl} onChange={handleFile} />
      </div>

      <div className="pt-1">
        <Button type="submit">Update Movie</Button>
      </div>
    </form>
  );
}