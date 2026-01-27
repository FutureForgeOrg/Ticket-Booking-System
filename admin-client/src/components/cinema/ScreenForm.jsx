import { useState } from "react";
import TextInput from "../common/TextInput";
import { Button } from "@/components/ui/button";
import SeatRowBuilder from "../common/SeatRowBuilder";

const ScreenForm = ({ onSubmit, onRemove }) => {
  const [name, setName] = useState("");


  //  screen-level
  const [rowGap, setRowGap] = useState(undefined);

  //  block-based rows
  const [rows, setRows] = useState([
    {
      row: "A",
      blocks: [{ count: 5, gap: false, seatType: "regular" }]
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !rows.length) {
      alert("Screen name and at least one row are required");
      return;
    }

  
    onSubmit({
      name,
      layout: {
        rowGap,
        rows
      }
    });

    // Reset
    setName("");

    setRowGap(undefined);
    setRows([
      {
        row: "A",
        blocks: [{ count: 5, gap: false, seatType: "regular" }]
      }
    ]);
  };

  return (
    <form
      className="border rounded bg-gray-50 max-h-[80vh] flex flex-col"
      onSubmit={handleSubmit}
    >
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold text-lg">Screen</h3>

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-500 hover:underline"
          >
            Remove Screen
          </button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <TextInput
          label="Screen Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

      
        {/* Row gap */}
        <TextInput
          label="Row Gap (optional)"
          type="number"
          value={rowGap ?? ""}
          onChange={(e) =>
            setRowGap(e.target.value === "" ? undefined : Number(e.target.value))
          }
        />

        {/* Rows + blocks */}
        <SeatRowBuilder rows={rows} setRows={setRows} />
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button type="submit" className="w-full">
          Add Screen
        </Button>
      </div>
    </form>
  );
};

export default ScreenForm;
