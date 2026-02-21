import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "@/lib/axios";

function AdminProfile({ setUser }) {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    state: "",
    gender: "male",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await instance.get("/auth/user", { withCredentials: true });
        if (res.data.data.role !== "admin") {
          navigate("/");
          return;
        }
        setAdmin(res.data.data);
      } catch (error) {
        navigate("/");
      }
    };
    fetchAdmin();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await instance.post("/auth/create-admin", form, { withCredentials: true });
      setMessage({ text: "New admin created successfully!", type: "success" });
      setForm({ name: "", email: "", password: "", phone: "", city: "", state: "", gender: "male" });
    } catch (error) {
      setMessage({ text: error.response?.data?.message || "Error creating admin", type: "error" });
    }
  };

  const handleLogout = async () => {
    try {
      await instance.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!admin)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-500 text-sm animate-pulse">Loading...</div>
      </div>
    );

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-800">Admin Profile</h2>
            <span className="text-xs bg-blue-50 text-blue-600 font-medium px-2.5 py-1 rounded-full">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {admin.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{admin.name}</p>
              <p className="text-sm text-gray-500">{admin.email}</p>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-medium transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Create Admin Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Create New Admin</h2>
          <p className="text-sm text-gray-400 mb-5">Fill in the details to add a new admin account.</p>

          {message.text && (
            <div
              className={`mb-5 text-sm px-4 py-2.5 rounded-lg border ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-600 border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
              <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} className={inputClass} required />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input type="email" name="email" placeholder="admin@example.com" value={form.email} onChange={handleChange} className={inputClass} required />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
              <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
              <input type="text" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
              <input type="text" name="city" placeholder="Mumbai" value={form.city} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">State</label>
              <input type="text" name="state" placeholder="Maharashtra" value={form.state} onChange={handleChange} className={inputClass} required />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition"
              >
                Create Admin
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default AdminProfile;