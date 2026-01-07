function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const getPages = () => {
        const pages = [];
        const delta = 1; // how many pages around current

        // Always show first page
        pages.push(1);

        // Dots before current range
        if (page - delta > 2) {
            pages.push("...");
        }

        // Decide where to start (at least 2, or current page - 1)
        let start = page - 1;
        if (start < 2) start = 2;

        // Decide where to end (at most totalPages - 1, or current page + 1)
        let end = page + 1;
        if (end > totalPages - 1) end = totalPages - 1;

        // Loop from start to end and add pages
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }


        // Dots after current range
        if (page + delta < totalPages - 1) {
            pages.push("...");
        }

        // Always show last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {/* Prev */}
            <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="px-3 py-2 border rounded-md text-sm font-medium
          hover:bg-gray-100 transition
          disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Prev
            </button>


            {pages.map((p, idx) =>
                p === "..." ? (
                    <span
                        key={idx}
                        className="px-3 py-2 text-gray-500 text-sm"
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={idx}
                        onClick={() => onPageChange(p)}
                        className={`px-3 py-2 rounded-md text-sm font-medium border transition
              ${p === page
                                ? "bg-black text-white border-black"
                                : "hover:bg-gray-100"
                            }`}
                    >
                        {p}
                    </button>
                )
            )}

            {/* Next */}
            <button
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="px-3 py-2 border rounded-md text-sm font-medium
          hover:bg-gray-100 transition
          disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
