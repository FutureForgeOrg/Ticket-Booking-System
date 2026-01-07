import { useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import columns from "./columns";
import CreateShowForm from "./CreateShowForm";
import ShowFilters from "./ShowFilters";
import useShowStore from "@/store/show.store";
import { useNavigate } from "react-router-dom";
import Pagination from "@/components/common/Pagination";

function ShowPage() {
  const navigate = useNavigate();

  const { fetchShows, shows, page, totalPages, setPage } = useShowStore()

  useEffect(() => {
    fetchShows()
  }, [page])

  return (
    <>
      <div className="p-4 space-y-4">
        <PageHeader
          title="Shows"
          actionText="createShow"
          onAction={() => navigate("/CreateShowForm")}
        />

        <ShowFilters />

        <DataTable
          columns={columns}
          data={shows}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}

export default ShowPage