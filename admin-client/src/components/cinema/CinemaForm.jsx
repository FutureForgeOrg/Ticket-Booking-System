import { useState } from "react";
import TextInput from "../common/TextInput";
import SeatRowBuilder from "../common/SeatRowBuilder";
import { Button } from "../ui/button";

function CinemaForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    name: "",
    locationName: "",
    city: "",
    state: "",
    screens: [
      {
        name: "",
        preset: "STANDARD",
        rowGap: undefined, // screen-level only
        rows: [{ row: "A", count: 10, seatType: "regular", columnGap: undefined, startGap: 210 }]
      }
    ]
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateScreen = (index, updatedScreen) => {
    setForm((prev) => {
      const screens = [...prev.screens];
      screens[index] = updatedScreen;
      return { ...prev, screens };
    });
  };

  const addScreen = () => {
    setForm((prev) => ({
      ...prev,
      screens: [
        ...prev.screens,
        {
          name: "",
          preset: "STANDARD",
          rowGap: undefined,
          rows: [{ row: "A", count: 10, seatType: "regular", columnGap: undefined, startGap: undefined }]
        }
      ]
    }));
  };

  const removeScreen = (index) => {
    setForm((prev) => ({
      ...prev,
      screens: prev.screens.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      location: {
        name: form.locationName,
        city: form.city,
        state: form.state
      },
      screens: form.screens.map((screen) => ({
        name: screen.name,
        preset: screen.preset,
        overrides: screen.rowGap !== undefined ? { rowGap: screen.rowGap } : {},
        rows: screen.rows
      }))
    };

    onSubmit(payload);
  };

  return (
    <div className="ml-20">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <h2 className="text-xl font-bold">Cinema Info</h2>

        <TextInput label="Cinema Name" name="name" value={form.name} onChange={handleChange} />
        <TextInput label="Location Name" name="locationName" value={form.locationName} onChange={handleChange} />
        <TextInput label="City" name="city" value={form.city} onChange={handleChange} />
        <TextInput label="State" name="state" value={form.state} onChange={handleChange} />

        <h2 className="text-xl font-bold">Screens</h2>

        {form.screens.map((screen, idx) => (
          <div key={idx} className="p-4 border rounded space-y-3 bg-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Screen {idx + 1}</h3>
              {form.screens.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 hover:underline"
                  onClick={() => removeScreen(idx)}
                >
                  Remove
                </button>
              )}
            </div>

            <TextInput
              label="Screen Name"
              value={screen.name}
              onChange={(e) => updateScreen(idx, { ...screen, name: e.target.value })}
            />

            <label className="block">
              <span className="text-gray-700">Preset</span>
              <select
                className="mt-1 block w-full border rounded px-2 py-1"
                value={screen.preset}
                onChange={(e) => updateScreen(idx, { ...screen, preset: e.target.value })}
              >
                <option value="STANDARD">STANDARD</option>
                <option value="VIP">VIP</option>
              </select>
            </label>

            {/* Screen-level Row Gap only */}
            <TextInput
              label="Row Gap (optional)"
              type="number"
              value={screen.rowGap ?? ""}
              onChange={(e) =>
                updateScreen(idx, {
                  ...screen,
                  rowGap: e.target.value === "" ? undefined : Number(e.target.value)
                })
              }
            />

            {/* Seat Rows: columnGap & startGap per row */}
            <SeatRowBuilder rows={screen.rows} setRows={(rows) => updateScreen(idx, { ...screen, rows })} />
          </div>
        ))}

        <div className="flex gap-4">
          <button
            type="button"
            className="px-4 py-2 h-9 bg-blue-500 text-white rounded"
            onClick={addScreen}
          >
            Add Screen
          </button>

          <Button disabled={loading}>
            {loading ? "Creating..." : "Create Cinema"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CinemaForm;

