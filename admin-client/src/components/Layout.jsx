// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";



// function Layout() {
//     return (
//         <>
//             <div className="flex h-screen ">
//                 <Sidebar />
//                 <div className="flex-1 ml-64 ">
//                     <Outlet />
//                 </div>

//             </div>
//         </>
//     )
// }

// export default Layout



import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex h-screen bg-slate-100/70">
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