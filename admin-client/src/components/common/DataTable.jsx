// function DataTable({ columns, data, renderActions }) {
//   const getValueByPath = (obj, path) => {
//     if (!path) return "";
//     return path.split(".").reduce((acc, key) => acc?.[key], obj);
//   };

//   const colSpan = columns.length + (renderActions ? 1 : 0);

//   return (
//     <div className="w-full overflow-hidden rounded-xl border bg-background shadow-sm">
//       <div className="w-full overflow-auto">
//         <table className="w-full min-w-[700px] border-collapse">
//           <thead className="sticky top-0 z-10 bg-muted/60 backdrop-blur">
//             <tr className="border-b">
//               {columns.map((col) => (
//                 <th
//                   key={col.header}
//                   className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
//                 >
//                   {col.header}
//                 </th>
//               ))}
//               {renderActions && (
//                 <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
//                   Actions
//                 </th>
//               )}
//             </tr>
//           </thead>

//           <tbody className="divide-y">
//             {Array.isArray(data) && data.length > 0 ? (
//               data.map((row, idx) => (
//                 <tr
//                   key={row._id ?? idx}
//                   className="transition-colors hover:bg-muted/40 odd:bg-background even:bg-muted/10"
//                 >
//                   {columns.map((col) => (
//                     <td
//                       key={col.accessorKey ?? col.header}
//                       className="px-4 py-3 text-sm text-foreground"
//                     >
//                       {col.cell
//                         ? col.cell({ row: { original: row } })
//                         : getValueByPath(row, col.accessorKey)}
//                     </td>
//                   ))}

//                   {renderActions && (
//                     <td className="px-4 py-3 text-right">
//                       <div className="inline-flex items-center gap-2">
//                         {renderActions(row)}
//                       </div>
//                     </td>
//                   )}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={colSpan}
//                   className="px-4 py-10 text-center text-sm text-muted-foreground"
//                 >
//                   No data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default DataTable;



function DataTable({ columns, data, renderActions }) {
  const getValueByPath = (obj, path) => {
    if (!path) return "";
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  const colSpan = columns.length + (renderActions ? 1 : 0);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-canvas/50">
              {columns.map((col) => (
                <th
                  key={col.header}
                  className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-text-secondary"
                >
                  {col.header}
                </th>
              ))}
              {renderActions && (
                <th className="px-5 py-3.5 text-right text-[10px] font-semibold uppercase tracking-widest text-text-secondary">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row, idx) => (
                <tr
                  key={row._id ?? idx}
                  className="group transition-colors duration-100 odd:bg-surface even:bg-canvas/50 hover:bg-primary-soft"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={col.accessorKey ?? col.header}
                      className={`px-5 py-3 text-sm text-text-primary transition-colors duration-100 ${
                        colIdx === 0
                          ? "border-l-2 border-transparent group-hover:border-primary"
                          : ""
                      }`}
                    >
                      {col.cell
                        ? col.cell({ row: { original: row } })
                        : getValueByPath(row, col.accessorKey)}
                    </td>
                  ))}

                  {renderActions && (
                    <td className="px-5 py-3 text-right">
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
                  className="px-5 py-14 text-center"
                >
                  <svg
                    className="mx-auto mb-3 text-text-muted"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                  <span className="text-sm text-text-muted">No data available</span>
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