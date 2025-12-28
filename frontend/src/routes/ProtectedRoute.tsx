import { Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  //   if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
