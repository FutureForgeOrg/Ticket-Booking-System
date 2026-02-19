import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <>
            <aside className=" fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border text-text-primary">
                <div className="p-4 text-xl font-bold ">
                    GoBookIt
                </div>

                <nav className="flex flex-col gap-9 p-4">
                    <NavItem to="/dashboard">Dashboard</NavItem>
                    <NavItem to="/movie">Movie</NavItem>
                    <NavItem to="/cinemaList">CinemaList</NavItem>
                    <NavItem to="/showPage">Show</NavItem>
                    <NavItem to="/booking">Booking</NavItem>
                    <NavItem to="/payment">Payment</NavItem>
                    <NavItem to="/event">Event</NavItem>
                    <NavItem to="/rating">Rating</NavItem>
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