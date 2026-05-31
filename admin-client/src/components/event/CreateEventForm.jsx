import { useState } from "react";
import TextInput from "@/components/common/TextInput";
import FileInput from "../common/FileInput";
import { Button } from "../ui/button";

function CreateEventForm({ onSubmit }) {
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
    categories: [
      { name: "VIP", price: "", totalSeats: "", availableSeats: "" },
      { name: "Gold", price: "", totalSeats: "", availableSeats: "" },
      { name: "Silver", price: "", totalSeats: "", availableSeats: "" },
    ],
    posterImage: null,
    bannerImage: null,
  });

  // 🔹 Normal input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 Category change
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

  //  File change
  const handleFileChange = (name, file) => {
    setForm((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("eventType", form.eventType);
    formData.append("comedianName", form.comedianName);
    formData.append("duration", form.duration);
    formData.append("ageRestriction", form.ageRestriction);
    formData.append("isFeatured", form.isFeatured);
    formData.append("venue", form.venue);
    formData.append("city", form.city);
    formData.append("date", form.date);

    //  Important
    formData.append("categories", JSON.stringify(form.categories));

    //  Must match backend
    if (form.posterImage) {
      formData.append("poster", form.posterImage);
    }

    if (form.bannerImage) {
      formData.append("banner", form.bannerImage);
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl space-y-6 bg-surface p-6 rounded-2xl shadow-sm border border-border"
    >
      <h2 className="text-2xl font-semibold text-text-primary">Create Event</h2>

      <TextInput label="Title" name="title" value={form.title} onChange={handleChange} required />

      <div>
        <label className="text-sm font-medium text-text-primary">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-border bg-canvas text-text-primary rounded-md px-3 py-2"
          required
        />
      </div>

      <TextInput label="Event Type" name="eventType" value={form.eventType} onChange={handleChange} required />

      <TextInput label="Comedian Name" name="comedianName" value={form.comedianName} onChange={handleChange} />

      <TextInput label="Duration (minutes)" type="number" name="duration" value={form.duration} onChange={handleChange} />

      <TextInput label="Age Restriction" name="ageRestriction" value={form.ageRestriction} onChange={handleChange} />

      <div className="flex items-center gap-2">
        <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
        <label className="text-sm font-medium text-text-primary">Featured Event</label>
      </div>

      <TextInput label="Venue" name="venue" value={form.venue} onChange={handleChange} />
      <TextInput label="City" name="city" value={form.city} onChange={handleChange} />
      <TextInput label="Date & Time" type="datetime-local" name="date" value={form.date} onChange={handleChange} />

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-2 text-text-primary">Categories</h3>

        {form.categories.map((cat, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mb-3">
            <TextInput label="Name" value={cat.name} disabled />
            <TextInput
              label="Price"
              type="number"
              value={cat.price}
              onChange={(e) => handleCategoryChange(index, "price", e.target.value)}
            />
            <TextInput
              label="Total Seats"
              type="number"
              value={cat.totalSeats}
              onChange={(e) => handleCategoryChange(index, "totalSeats", e.target.value)}
            />
            <TextInput label="Available Seats" type="number" value={cat.availableSeats} disabled />
          </div>
        ))}
      </div>

      <FileInput label="Event Poster" name="posterImage" onChange={handleFileChange} />
      <FileInput label="Event Banner" name="bannerImage" onChange={handleFileChange} />

      <Button type="submit">Create Event</Button>
    </form>
  );
}

export default CreateEventForm;