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

      {/* Cinema Info */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-text-primary border-b border-border pb-2">Cinema Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <TextInput label="Cinema Name" name="name" value={form.name} onChange={handleChange} />
          <TextInput label="Location Name" name="locationName" value={form.locationName} onChange={handleChange} />
          <TextInput label="City" name="city" value={form.city} onChange={handleChange} />
          <TextInput label="State" name="state" value={form.state} onChange={handleChange} />
        </div>
      </div>

      {/* Screens */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-text-primary border-b border-border pb-2">Screens</h2>

        {form.screens.map((screen, idx) => (
          <div key={idx} className="rounded-xl border border-border bg-surface p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">Screen {idx + 1}</span>
              {form.screens.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeScreen(idx)}
                  className="text-xs font-medium text-danger hover:text-danger/80 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Screen Name"
                value={screen.name}
                onChange={(e) => updateScreen(idx, { ...screen, name: e.target.value })}
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
            </div>

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
      </div>

      <div className="flex gap-3 pt-1">
        <Button type="button" onClick={addScreen}>+ Add Screen</Button>
        <Button disabled={loading}>{loading ? "Creating..." : "Create Cinema"}</Button>
      </div>

    </form>
  );
}

export default CinemaForm;
