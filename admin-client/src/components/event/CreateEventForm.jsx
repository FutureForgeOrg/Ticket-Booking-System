import { useState } from "react";
import TextInput from "@/components/common/TextInput";
import FileInput from "../common/FileInput";
import { Button } from "../ui/button";

function CreateEventForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "", // ✅ string now
    comedianName: "",
    duration: "",
    ageRestriction: "",
    isFeatured: false,
    venue: "",
    city: "",
    date: "",
    categories: [
      { name: "VIP", price: "", totalSeats: "", availableSeats: "" },
      { name: "Gold", price: "", totalSeats: "", availableSeats: "" },
      { name: "Silver", price: "", totalSeats: "", availableSeats: "" },
    ],
    posterImage: null,
  });

  // 🔹 Handle normal input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 Handle category change
  const handleCategoryChange = (index, field, value) => {
    const updated = [...form.categories];
    updated[index][field] = value;

    // Auto set availableSeats = totalSeats
    if (field === "totalSeats") {
      updated[index].availableSeats = value;
    }

    setForm((prev) => ({
      ...prev,
      categories: updated,
    }));
  };

  // 🔹 Handle file
  const handleFileChange = (name, file) => {
    setForm((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.eventType.trim()) {
      alert("Please enter event type");
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("eventType", form.eventType); // ✅ string
    formData.append("comedianName", form.comedianName);
    formData.append("duration", form.duration);
    formData.append("ageRestriction", form.ageRestriction);
    formData.append("isFeatured", form.isFeatured);
    formData.append("venue", form.venue);
    formData.append("city", form.city);
    formData.append("date", form.date);

    formData.append("categories", JSON.stringify(form.categories));

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
      <h2 className="text-2xl font-semibold">Create Event</h2>

      {/* Title */}
      <TextInput
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />

      {/* Description */}
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
        placeholder="e.g. Comedy, Music, Workshop"
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
        name="duration"
        type="number"
        value={form.duration}
        onChange={handleChange}
      />

      <TextInput
        label="Age Restriction"
        name="ageRestriction"
        value={form.ageRestriction}
        onChange={handleChange}
        placeholder="e.g. 16+"
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

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>

        {form.categories.map((cat, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mb-3">
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

      {/* Poster */}
      <FileInput
        label="Event Poster"
        name="posterImage"
        onChange={handleFileChange}
      />

      <Button type="submit">Create Event</Button>
    </form>
  );
}

export default CreateEventForm;
