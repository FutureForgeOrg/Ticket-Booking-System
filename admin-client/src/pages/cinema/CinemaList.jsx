import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import ConfirmButton from "@/components/common/ConfirmButton";
import useCinemaStore from "@/store/cinema.store";
import Pagination from "@/components/common/Pagination";

function CinemaList() {
  const { cinemas, getAllCinemas, deleteCinema, page, totalPages, setPage } = useCinemaStore();
  const navigate = useNavigate();

  useEffect(() => {
    getAllCinemas();
  }, [page]);


  const tableData = cinemas.map(cinema => ({
    _id: cinema._id,
    name: cinema.name,
    city: cinema.location.city,
    state: cinema.location.state,
    screens: cinema.screens.length,
  }));

  return (
    <>
      <div className="p-8">
        <PageHeader
          title="Cinemas"
          actionText="Add Cinema"
          onAction={() => navigate("/createCinema")}
        />

        <DataTable
          columns={[
            { header: "Name", accessorKey: "name" },
            { header: "City", accessorKey: "city" },
            { header: "State", accessorKey: "state" },
            { header: "Screens", accessorKey: "screens" },]}
          data={tableData}
          renderActions={(row) => (
            <div className="flex gap-4">
              <button onClick={() => navigate(`/cinemaDetails/${row._id}`)}>
                View
              </button>
              <ConfirmButton
                onConfirm={() => deleteCinema(row._id).then(getAllCinemas)}
              > Delete</ConfirmButton>
            </div>
          )}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}

export default CinemaList;