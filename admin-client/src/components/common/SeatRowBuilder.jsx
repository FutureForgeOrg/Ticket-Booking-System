import { Button } from "../ui/button";

function SeatRowBuilder({ rows, setRows }) {
  const updateRow = (i, row) => {
    const updated = [...rows];
    updated[i] = row;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        row: String.fromCharCode(65 + rows.length),
        blocks: [{ count: 5, gap: false, seatType: "regular" }]
      }
    ]);
  };

  const addBlock = (rowIndex) => {
    const row = rows[rowIndex];
    updateRow(rowIndex, {
      ...row,
      blocks: [...row.blocks, { count: 1, gap: false, seatType: "regular" }]
    });
  };

  return (
    <div className="space-y-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="border p-3 rounded bg-white">
          <strong>Row {row.row}</strong>

          {row.blocks.map((block, blockIndex) => (
            <div key={blockIndex} className="flex gap-2 mt-2 items-center">
              <input
                type="number"
                className="w-20 border rounded px-2 py-1"
                value={block.count}
                onChange={(e) => {
                  const blocks = [...row.blocks];
                  blocks[blockIndex] = { ...block, count: Number(e.target.value) };
                  updateRow(rowIndex, { ...row, blocks });
                }}
              />

              <select
                value={block.gap ? "gap" : "seat"}
                onChange={(e) => {
                  const blocks = [...row.blocks];
                  blocks[blockIndex] =
                    e.target.value === "gap"
                      ? { count: block.count, gap: true }
                      : { count: block.count, gap: false, seatType: "regular" };
                  updateRow(rowIndex, { ...row, blocks });
                }}
              >
                <option value="seat">Seats</option>
                <option value="gap">Gap</option>
              </select>

              {!block.gap && (
                <select
                  value={block.seatType}
                  onChange={(e) => {
                    const blocks = [...row.blocks];
                    blocks[blockIndex] = { ...block, seatType: e.target.value };
                    updateRow(rowIndex, { ...row, blocks });
                  }}
                >
                  <option value="regular">Regular</option>
                  <option value="premium">Premium</option>
                  <option value="vip">VIP</option>
                </select>
              )}
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  const blocks = row.blocks.filter((_, idx) => idx !== blockIndex);
                  updateRow(rowIndex, { ...row, blocks });
                }}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button type="button" className="mt-2" onClick={() => addBlock(rowIndex)}>
            + Add Block
          </Button>
        </div>
      ))}

      <Button type="button" onClick={addRow}>+ Add Row</Button>
    </div>
  );
}

export default SeatRowBuilder;
