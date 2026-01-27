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
        layout: {
          rowGap: undefined,
          rows: [
            {
              row: "A",
              blocks: [{ count: 5, gap: false, seatType: "regular" }]
            }
          ]
        }
      }
    ]
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateScreen = (index, updatedScreen) => {
    const screens = [...form.screens];
    screens[index] = updatedScreen;
    setForm({ ...form, screens });
  };

  const addScreen = () => {
    setForm({
      ...form,
      screens: [
        ...form.screens,
        {
          name: "",
          layout: {
            rowGap: undefined,
            rows: [
              {
                row: "A",
                blocks: [{ count: 5, gap: false, seatType: "regular" }]
              }
            ]
          }
        }
      ]
    });
  };

  const removeScreen = (index) => {
    setForm({
      ...form,
      screens: form.screens.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cinema validation
    if (!form.name || !form.locationName || !form.city || !form.state) {
      alert("Please fill all cinema details");
      return;
    }

    // Screen validation
    for (let i = 0; i < form.screens.length; i++) {
      const screen = form.screens[i];

      if (!screen.name) {
        alert(`Screen ${i + 1} name is required`);
        return;
      }

      if (!screen.layout.rows.length) {
        alert(`Screen ${i + 1} must have at least one row`);
        return;
      }
    }

    const payload = {
      name: form.name,
      location: {
        name: form.locationName,
        city: form.city,
        state: form.state
      },
      screens: form.screens
    };
  
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl ml-20">
      <h2 className="text-xl font-bold">Cinema Info</h2>

      <TextInput label="Cinema Name" name="name" value={form.name} onChange={handleChange} />
      <TextInput label="Location Name" name="locationName" value={form.locationName} onChange={handleChange} />
      <TextInput label="City" name="city" value={form.city} onChange={handleChange} />
      <TextInput label="State" name="state" value={form.state} onChange={handleChange} />

      <h2 className="text-xl font-bold">Screens</h2>

      {form.screens.map((screen, idx) => (
        <div key={idx} className="border p-4 rounded bg-gray-50 space-y-4">
          <div className="flex justify-between">
            <strong>Screen {idx + 1}</strong>
            {form.screens.length > 1 && (
              <button type="button" className="text-red-500" onClick={() => removeScreen(idx)}>
                Remove
              </button>
            )}
          </div>

          <TextInput
            label="Screen Name"
            value={screen.name}
            onChange={(e) =>
              updateScreen(idx, { ...screen, name: e.target.value })
            }
          />

          <TextInput
            label="Row Gap (optional)"
            type="number"
            value={screen.layout.rowGap ?? ""}
            onChange={(e) =>
              updateScreen(idx, {
                ...screen,
                layout: {
                  ...screen.layout,
                  rowGap: e.target.value === "" ? undefined : Number(e.target.value)
                }
              })
            }
          />

          <SeatRowBuilder
            rows={screen.layout.rows}
            setRows={(rows) =>
              updateScreen(idx, {
                ...screen,
                layout: { ...screen.layout, rows }
              })
            }
          />
        </div>
      ))}

      <div className="flex gap-4">
        <Button type="button" onClick={addScreen}>+ Add Screen</Button>
        <Button disabled={loading}>{loading ? "Creating..." : "Create Cinema"}</Button>
      </div>
    </form>
  );
}

export default CinemaForm;
