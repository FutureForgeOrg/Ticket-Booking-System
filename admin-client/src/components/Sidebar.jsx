import { NavLink } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

function Sidebar() {
    const { theme, setTheme } = useTheme();

    return (
        <>
            <aside className=" fixed left-0 top-0 h-screen w-64 flex flex-col bg-surface border-r border-border text-text-primary">
                <div className="p-4 text-xl font-bold ">
                    GoBookIt
                </div>

                <nav className="flex flex-col gap-14 p-4 flex-1 overflow-y-auto">
                    <NavItem to="/dashboard">Dashboard</NavItem>
                    <NavItem to="/movie">Movie</NavItem>
                    <NavItem to="/cinemaList">CinemaList</NavItem>
                    <NavItem to="/showPage">Show</NavItem>
                    <NavItem to="/booking">Booking</NavItem>
                    <NavItem to="/payment">Payment</NavItem>
                    <NavItem to="/event">Event</NavItem>
                    {/* <NavItem to="/rating">Rating</NavItem> */}
                    <NavItem to="/profile">Admin Profile</NavItem>
                </nav>

                <div className="p-4 border-t border-border mt-auto">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex items-center gap-2 p-2 rounded-lg text-text-secondary hover:bg-canvas hover:text-primary transition-colors w-full"
                    >
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        <span className="font-medium">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                    </button>
                </div>

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