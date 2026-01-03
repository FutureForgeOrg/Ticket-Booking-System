

function DataTable({ columns, data, renderActions }) {
    return (
        <>
            <table className="w-full border rounded-lg">
                <thead className="bg-muted">
                    <tr>
                        {columns.map(col => (
                            <th key={col} className="p-3 text-left">{col}</th>
                        ))}
                        {renderActions && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map(row => (
                            <tr key={row._id} className="border-t">
                                {columns.map(col => (
                                    <td key={col} className="p-3">{row[col]}</td>
                                ))}
                                {renderActions && <td className="p-2">{renderActions(row)}</td>}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (renderActions ? 1 : 0)} className="p-3 text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </>
    )
}

export default DataTable