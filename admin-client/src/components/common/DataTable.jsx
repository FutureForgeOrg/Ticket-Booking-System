function DataTable({ columns, data, renderActions }) {
  const getValueByPath = (obj, path) => {
    if (!path) return "";
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  const colSpan = columns.length + (renderActions ? 1 : 0);

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-background shadow-sm">
      <div className="w-full overflow-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead className="sticky top-0 z-10 bg-muted/60 backdrop-blur">
            <tr className="border-b">
              {columns.map((col) => (
                <th
                  key={col.header}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  {col.header}
                </th>
              ))}
              {renderActions && (
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row, idx) => (
                <tr
                  key={row._id ?? idx}
                  className="transition-colors hover:bg-muted/40 odd:bg-background even:bg-muted/10"
                >
                  {columns.map((col) => (
                    <td
                      key={col.accessorKey ?? col.header}
                      className="px-4 py-3 text-sm text-foreground"
                    >
                      {col.cell
                        ? col.cell({ row: { original: row } })
                        : getValueByPath(row, col.accessorKey)}
                    </td>
                  ))}

                  {renderActions && (
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        {renderActions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={colSpan}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
