import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex h-screen bg-canvas text-text-primary transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 ml-64 overflow-y-auto">
        <div className="min-h-full p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;