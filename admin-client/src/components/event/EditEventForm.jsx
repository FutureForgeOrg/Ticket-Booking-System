import { useEffect, useState } from "react";
import TextInput from "@/components/common/TextInput";
import FileInput from "@/components/common/FileInput";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

function EditEventForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "",
    comedianName: "",
    duration: "",
    ageRestriction: "",
    isFeatured: false,
    venue: "",
    city: "",
    date: "",
    categories: [],
  });

  const [files, setFiles] = useState({
    poster: null,
    banner: null,
  });

  // Load initial data
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        eventType: initialData.eventType || "",
        comedianName: initialData.comedianName || "",
        duration: initialData.duration || "",
        ageRestriction: initialData.ageRestriction || "",
        isFeatured: initialData.isFeatured || false,
        venue: initialData.venue || "",
        city: initialData.city || "",
        date: initialData.date
          ? new Date(initialData.date).toISOString().slice(0, 16)
          : "",
        categories: initialData.categories || [],
      });
    }
  }, [initialData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle category update
  const handleCategoryChange = (index, field, value) => {
    const updated = [...form.categories];
    updated[index][field] = value;

    setForm((prev) => ({
      ...prev,
      categories: updated,
    }));
  };

  // Handle file selection
  const handleFile = (name, file) => {
    setFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  // Compare updated fields
  const compareUpdatedFields = (initial, updated) => {
    const changed = {};

    for (const key in updated) {
      if (key === "date") {
        const initialDate = initial.date
          ? new Date(initial.date).toISOString().slice(0, 16)
          : "";
        const updatedDate = updated.date || "";

        if (initialDate !== updatedDate) {
          changed.date = updated.date;
        }
        continue;
      }

      if (key === "categories") {
        if (
          JSON.stringify(initial.categories || []) !==
          JSON.stringify(updated.categories)
        ) {
          changed.categories = updated.categories;
        }
        continue;
      }

      if (initial[key] !== updated[key]) {
        changed[key] = updated[key];
      }
    }

    return changed;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!initialData) return;

    const changedData = compareUpdatedFields(initialData, form);

    if (
      Object.keys(changedData).length === 0 &&
      !files.poster &&
      !files.banner
    ) {
      toast.error("No changes made to update.");
      return;
    }

    const fd = new FormData();

    for (const key in changedData) {
      if (key === "categories") {
        fd.append("categories", JSON.stringify(changedData.categories));
      } else {
        fd.append(key, changedData[key]);
      }
    }

    if (files.poster) {
      fd.append("poster", files.poster);
    }

    if (files.banner) {
      fd.append("banner", files.banner);
    }

    onSubmit(fd);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl space-y-6 bg-surface p-6 rounded-2xl shadow-sm border border-border"
    >
      <h2 className="text-2xl font-semibold text-text-primary">Edit Event</h2>

      {/* Basic Fields */}
      <TextInput label="Title" name="title" value={form.title} onChange={handleChange} />

      <div>
        <label className="text-sm font-medium text-text-primary">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-border bg-canvas text-text-primary rounded-md px-3 py-2"
        />
      </div>

      <TextInput label="Event Type" name="eventType" value={form.eventType} onChange={handleChange} />
      <TextInput label="Comedian Name" name="comedianName" value={form.comedianName} onChange={handleChange} />
      <TextInput label="Duration" type="number" name="duration" value={form.duration} onChange={handleChange} />
      <TextInput label="Age Restriction" name="ageRestriction" value={form.ageRestriction} onChange={handleChange} />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isFeatured"
          checked={form.isFeatured}
          onChange={handleChange}
        />
        <label className="text-sm font-medium text-text-primary">Featured Event</label>
      </div>

      <TextInput label="Venue" name="venue" value={form.venue} onChange={handleChange} />
      <TextInput label="City" name="city" value={form.city} onChange={handleChange} />
      <TextInput label="Date & Time" type="datetime-local" name="date" value={form.date} onChange={handleChange} />

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-2 text-text-primary">Categories</h3>
        {form.categories.map((cat, index) => (
          <div key={cat._id || index} className="grid grid-cols-4 gap-4 mb-3">
            <TextInput label="Name" value={cat.name} disabled />
            <TextInput
              label="Price"
              type="number"
              value={cat.price}
              onChange={(e) =>
                handleCategoryChange(index, "price", e.target.value)
              }
            />
            <TextInput
              label="Total Seats"
              type="number"
              value={cat.totalSeats}
              onChange={(e) =>
                handleCategoryChange(index, "totalSeats", e.target.value)
              }
            />
            <TextInput
              label="Available Seats"
              type="number"
              value={cat.availableSeats}
              disabled
            />
          </div>
        ))}
      </div>

      {/* Current Image Preview */}
      <div className="grid grid-cols-2 gap-6">
        {initialData?.posterUrl && (
          <div>
            <p className="text-sm font-medium mb-2 text-text-primary">Current Poster</p>
            <img
              src={initialData.posterUrl}
              alt="Poster"
              className="w-full h-48 object-cover rounded-lg border border-border"
            />
          </div>
        )}

        {initialData?.bannerUrl && (
          <div>
            <p className="text-sm font-medium mb-2 text-text-primary">Current Banner</p>
            <img
              src={initialData.bannerUrl}
              alt="Banner"
              className="w-full h-48 object-cover rounded-lg border border-border"
            />
          </div>
        )}
      </div>

      {/* Upload New Files */}
      <div className="grid grid-cols-2 gap-4">
        <FileInput label="Replace Poster" name="poster" onChange={handleFile} />
        <FileInput label="Replace Banner" name="banner" onChange={handleFile} />
      </div>

      {/* New Image Preview */}
      <div className="grid grid-cols-2 gap-6">
        {files.poster && (
          <div>
            <p className="text-sm font-medium text-text-primary mb-2">New Poster Preview</p>
            <img
              src={URL.createObjectURL(files.poster)}
              alt="New Poster"
              className="w-full h-48 object-cover rounded-lg border border-border"
            />
          </div>
        )}

        {files.banner && (
          <div>
            <p className="text-sm font-medium text-text-primary mb-2">New Banner Preview</p>
            <img
              src={URL.createObjectURL(files.banner)}
              alt="New Banner"
              className="w-full h-48 object-cover rounded-lg border border-border"
            />
          </div>
        )}
      </div>

      <Button type="submit">Update Event</Button>
    </form>
  );
}

export default EditEventForm;