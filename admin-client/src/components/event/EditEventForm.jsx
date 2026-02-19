import { useEffect, useState } from "react";
import TextInput from "@/components/common/TextInput";
import FileInput from "@/components/common/FileInput";
import { Button } from "@/components/ui/button";

function EditEventForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "", // ✅ now string
    comedianName: "",
    duration: "",
    ageRestriction: "",
    isFeatured: false,
    venue: "",
    city: "",
    date: "",
    categories: [],
    posterImage: null,
  });

  // ✅ Fill form when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        eventType: initialData.eventType || "", // string
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
        posterImage: null,
      });
    }
  }, [initialData]);

  // ✅ Handle normal inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Handle category change
  const handleCategoryChange = (index, field, value) => {
    const updated = [...form.categories];
    updated[index][field] = value;

    setForm((prev) => ({
      ...prev,
      categories: updated,
    }));
  };

  // ✅ Handle file
  const handleFileChange = (name, file) => {
    setForm((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (key !== "categories" && key !== "posterImage") {
        formData.append(key, form[key]);
      }
    });

    // Send categories as JSON
    formData.append("categories", JSON.stringify(form.categories));

    // Send image only if changed
    if (form.posterImage) {
      formData.append("image", form.posterImage);
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl space-y-6 bg-white p-6 rounded-2xl shadow-sm border"
    >
      <h2 className="text-2xl font-semibold">Edit Event</h2>

      <TextInput
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
        />
      </div>

      {/* ✅ Event Type (String) */}
      <TextInput
        label="Event Type"
        name="eventType"
        value={form.eventType}
        onChange={handleChange}
        required
      />

      <TextInput
        label="Comedian Name"
        name="comedianName"
        value={form.comedianName}
        onChange={handleChange}
      />

      <TextInput
        label="Duration (minutes)"
        type="number"
        name="duration"
        value={form.duration}
        onChange={handleChange}
      />

      <TextInput
        label="Age Restriction"
        name="ageRestriction"
        value={form.ageRestriction}
        onChange={handleChange}
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isFeatured"
          checked={form.isFeatured}
          onChange={handleChange}
        />
        <label>Featured Event</label>
      </div>

      <TextInput
        label="Venue"
        name="venue"
        value={form.venue}
        onChange={handleChange}
      />

      <TextInput
        label="City"
        name="city"
        value={form.city}
        onChange={handleChange}
      />

      <TextInput
        label="Date & Time"
        type="datetime-local"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      {/* ✅ Categories */}
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>

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

      <FileInput
        label="Event Poster"
        name="posterImage"
        value={initialData?.posterImage}
        onChange={handleFileChange}
      />

      <Button type="submit">Update Event</Button>
    </form>
  );
}

export default EditEventForm;
