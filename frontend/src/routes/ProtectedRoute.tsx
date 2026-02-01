import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute() {
  const { user, authInitialized } = useAuthStore();

  // on reload, authInitialized might be false initially so wait untill auth check is done
  if (!authInitialized) {
    return null;
  }

  console.log("ProtectedRoute user:", user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
