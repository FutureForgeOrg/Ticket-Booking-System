import { Button } from "../ui/button";

const SeatRowBuilder = ({ rows, setRows }) => {

  const addRow = () => {
    setRows([...rows, { row: "", count: "", type: "regular" }]);
  };

  const updateRow = (index, key, value) => {
    const updated = [...rows];
    updated[index][key] = value;
    setRows(updated);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h3 className="font-semibold">Seat Rows</h3>

      {rows.map((r, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            className="border p-2 w-16"
            placeholder="Row"
            value={r.row}
            onChange={(e) =>
              updateRow(index, "row", e.target.value.toUpperCase())
            }
          />

          <input
            type="number"
            className="border p-2 w-24"
            placeholder="Seats"
            value={r.count}
            onChange={(e) =>
              updateRow(index, "count", e.target.value)
            }
          />

          <select
            className="border p-2"
            value={r.type}
            onChange={(e) =>
              updateRow(index, "type", e.target.value)
            }
          >
            <option value="regular">Regular</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>

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
