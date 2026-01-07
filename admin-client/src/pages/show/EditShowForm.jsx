import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextInput from "@/components/common/TextInput";
import ConfirmButton from "@/components/common/ConfirmButton";
import useShowStore from "@/store/show.store";

function EditShowForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { show } = location.state || {};
  const { id } = useParams();

  const { editShow } = useShowStore();

  // Show loading if show is not passed
  if (!show) return <div>Loading...</div>;

  const [form, setForm] = useState({
    showTime: new Date(show.showTime).toISOString().slice(0, 16),
    price: { regular: "", premium: "", vip: "" }
  });

  const handleSubmit = async () => {
    await editShow(show._id, form);
    navigate(-1);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold">Edit Show</h1>

      <TextInput
        label="Show Time"
        type="datetime-local"
        min={new Date().toISOString().slice(0, 16)} 
        value={form.showTime}
        onChange={(e) => setForm({ ...form, showTime: e.target.value })}
      />

      <TextInput
        label="regular Price"
        type="number"
        value={form.price.regular}
        onChange={(e) => setForm({ ...form, price: { ...form.price, regular: e.target.value } })}
      />
      <TextInput
        label="premium Price"
        type="number"
        value={form.price.premium}
        onChange={(e) => setForm({ ...form, price: { ...form.price, premium: e.target.value } })}
      />
      <TextInput
        label="vip Price"
        type="number"
        value={form.price.vip}
        onChange={(e) => setForm({ ...form, price: { ...form.price, vip: e.target.value } })}
      />

      <ConfirmButton onConfirm={handleSubmit}>
        Update Show
      </ConfirmButton>
    </div>
  );
}

export default EditShowForm;
