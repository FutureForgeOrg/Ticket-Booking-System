import { Button } from "../ui/button";

const SeatRowBuilder = ({ rows, setRows }) => {
  const addRow = () => {
    setRows([
      ...rows,
      {
        row: "",
        count: undefined,
        seatType: "regular",
        columnGap: undefined, // row-level
        startGap: undefined   // row-level
      }
    ]);
  };

  const updateRow = (index, key, value) => {
    const updated = [...rows];
    if (key === "count" || key === "columnGap" || key === "startGap") {
      updated[index][key] = value === "" ? undefined : Number(value);
    } else {
      updated[index][key] = value;
    }
    setRows(updated);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h3 className="font-semibold">Seat Rows</h3>

      {rows.map((r, index) => (
        <div key={index} className="flex gap-2 items-center flex-wrap">
          {/* Row label */}
          <input
            className="border p-2 w-14"
            placeholder="Row"
            value={r.row ?? ""}
            onChange={(e) => updateRow(index, "row", e.target.value.toUpperCase())}
          />

          {/* Seat count */}
          <input
            type="number"
            className="border p-2 w-20"
            placeholder="Seats"
            value={r.count ?? ""}
            onChange={(e) => updateRow(index, "count", e.target.value)}
          />

          {/* Seat type */}
          <select
            className="border p-2"
            value={r.seatType}
            onChange={(e) => updateRow(index, "seatType", e.target.value)}
          >
            <option value="regular">Regular</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>

          {/* Column Gap override (row-level only) */}
          <input
            type="number"
            className="border p-2 w-24"
            placeholder="Column Gap"
            value={r.columnGap ?? ""}
            onChange={(e) => updateRow(index, "columnGap", e.target.value)}
          />

          {/* Start Gap override (row-level only) */}
          <input
            type="number"
            className="border p-2 w-24"
            placeholder="Start Gap"
            value={r.startGap ?? ""}
            onChange={(e) => updateRow(index, "startGap", e.target.value)}
          />

          <button
            type="button"
            onClick={() => removeRow(index)}
            className="text-red-500"
          >
            remove
          </button>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={addRow}>
        Add Row
      </Button>
    </div>
  );
};

export default SeatRowBuilder;
