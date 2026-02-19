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
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 shadow-sm shadow-slate-200/80 ring-1 ring-slate-900/5">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200/70 bg-gradient-to-b from-slate-50 to-slate-100/80">
              {columns.map((col) => (
                <th
                  key={col.header}
                  className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-400"
                >
                  {col.header}
                </th>
              ))}
              {renderActions && (
                <th className="px-5 py-3.5 text-right text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row, idx) => (
                <tr
                  key={row._id ?? idx}
                  className="group transition-colors duration-100 odd:bg-white even:bg-slate-50/60 hover:bg-indigo-50/40"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={col.accessorKey ?? col.header}
                      className={`px-5 py-3 text-sm text-slate-700 transition-colors duration-100 ${
                        colIdx === 0
                          ? "border-l-2 border-transparent group-hover:border-indigo-400"
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
                    className="mx-auto mb-3 text-slate-300"
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
                  <span className="text-sm text-slate-400">No data available</span>
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