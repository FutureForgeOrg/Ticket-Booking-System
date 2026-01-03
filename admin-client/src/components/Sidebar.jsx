import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <>
            <aside className=" fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border text-text-primary">
                <div className="p-4 text-xl font-bold ">
                    GoBookIt
                </div>

                <nav className="flex flex-col gap-9 p-4">
                    <NavItem to="/Dashboard">Dashboard</NavItem>
                    <NavItem to="/Movie">Movie</NavItem>
                    <NavItem to="/CinemaList">CinemaList</NavItem>
                    <NavItem to="/Show">Show</NavItem>
                    <NavItem to="/User">User</NavItem>
                    <NavItem to="/Payment">Payment</NavItem>
                    <NavItem to="/System">System</NavItem>
                    <NavItem to="/Rating">Rating</NavItem>
                </nav>

            </aside>
        </>
    )
}

function NavItem({ to, children }) {
    return (
        <>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-l font-medium transition
        ${isActive
                        ? "bg-primary-soft text-primary"
                        : "text-text-secondary hover:bg-surface"}`
                }
            >
                {children}
            </NavLink>
        </>
    )
}


export default Sidebar