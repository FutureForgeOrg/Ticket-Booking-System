import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import TextInput from "@/components/common/TextInput";
import ConfirmButton from "@/components/common/ConfirmButton";
import useShowStore from "@/store/show.store";
// import ReusableSelect from "@/components/common/ReuableSelect";

function EditShowForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { show } = location.state || {};
  const { editShow } = useShowStore();

  // Show loading if show is not passed
  if (!show) return <div className="text-center mt-20 text-text-muted">Loading...</div>;

  const [form, setForm] = useState({
    showTime: new Date(show.showTime).toISOString().slice(0, 16),
    price: {
      regular: show.price?.regular || "",
      premium: show.price?.premium || "",
      vip: show.price?.vip || ""
    }
    // status: show.status || "ACTIVE"
  });

  const handleSubmit = async () => {
    await editShow(show._id, form);
    navigate(-1);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-surface shadow-lg border border-border rounded-lg">
      <h1 className="text-2xl font-semibold text-text-primary mb-6">Edit Show</h1>

      {/* Show Time */}
      <TextInput
        label="Show Time"
        type="datetime-local"
        min={new Date().toISOString().slice(0, 16)}
        value={form.showTime}
        onChange={(e) => setForm({ ...form, showTime: e.target.value })}
        className="w-full"
      />

      {/* Price Fields in a Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <TextInput
          label="Regular Price"
          type="number"
          value={form.price.regular}
          onChange={(e) =>
            setForm({ ...form, price: { ...form.price, regular: e.target.value } })
          }
          className="w-full"
        />
        <TextInput
          label="Premium Price"
          type="number"
          value={form.price.premium}
          onChange={(e) =>
            setForm({ ...form, price: { ...form.price, premium: e.target.value } })
          }
          className="w-full"
        />
        <TextInput
          label="VIP Price"
          type="number"
          value={form.price.vip}
          onChange={(e) =>
            setForm({ ...form, price: { ...form.price, vip: e.target.value } })
          }
          className="w-full"
        />
        {/* <ReusableSelect
            label="Status"
            options={[
              { value: "ACTIVE", label: "Active" },
              { value: "COMPLETED", label: "Completed" },
              { value: "CANCELLED", label: "Cancelled" }
            ]}
            value={form.status}
            onChange={(v) => setForm({ ...form, status: v })}
            className="w-full"
            emptyMessage="Select Cinema first for available screens"
        /> */}
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <ConfirmButton
          onConfirm={handleSubmit}
          className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-md shadow"
        >
          Update Show
        </ConfirmButton>
      </div>
    </div>
  );
}

export default EditShowForm;
