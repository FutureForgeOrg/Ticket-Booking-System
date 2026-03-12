import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import PageHeader from "../../components/common/PageHeader";
import Pagination from "../../components/common/Pagination";
import ReusableSelect from "../../components/common/ReuableSelect";
import usePaymentStore from "@/store/usePaymentStore";

export default function PaymentsPage() {
  const navigate = useNavigate();

  const {
    payments,
    page,
    totalPages,
    loading,
    filters,
    setPage,
    setFilters,
    fetchPayments,
    refundPayment,
  } = usePaymentStore();

  // Fetch when page or filters change
  useEffect(() => {
    fetchPayments();
  }, [page, filters]);

  const columns = [
    { header: "User", accessorKey: "user.name" },
    { header: "Email", accessorKey: "user.email" },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => `₹${row.original.amount}`,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;

        const colorMap = {
          created: "bg-gray-200 text-gray-700",
          paid: "bg-green-100 text-green-700",
          failed: "bg-red-100 text-red-700",
          refunded: "bg-yellow-100 text-yellow-700",
        };

        return (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${colorMap[status]}`}
          >
            {status}
          </span>
        );
      },
    },
    { header: "Type", accessorKey: "bookingType" },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6">
      <PageHeader title="Payments Management" />

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4 mb-6 max-w-md">
        <ReusableSelect
          label="Status"
          value={filters.status || "all"}
          onChange={(val) =>
            setFilters({
              ...filters,
              status: val === "all" ? "" : val,
            })
          }
          options={[
            { label: "All", value: "all" },
            { label: "Created", value: "created" },
            { label: "Paid", value: "paid" },
            { label: "Failed", value: "failed" },
            { label: "Refunded", value: "refunded" },
          ]}
        />

        <ReusableSelect
          label="Booking Type"
          value={filters.bookingType || "all"}
          onChange={(val) =>
            setFilters({
              ...filters,
              type: val === "all" ? "" : val,
            })
          }
          options={[
            { label: "All", value: "all" },
            { label: "Show", value: "show" },
            { label: "Event", value: "event" },
          ]}
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={payments}
        renderActions={(row) => (
          <>
            <button
              onClick={() =>
                navigate(`/payments/${row._id}`)
              }
              className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-md"
            >
              View
            </button>

           
          </>
        )}
      />

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center text-white text-lg">
          Loading...
        </div>
      )}
    </div>
  );
}