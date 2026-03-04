import Button from "../../ui/Button";
import { NavLink } from "../../ui/Navlink";
import Select from "../../ui/Select";
import { useCityStore } from "../../../store/cityStore";
import { popularCities } from "../../../utils/data/cities";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import UserMenu from "./UserMenu";
import { useThemeStore } from "../../../store/themeStore";

export default function Navbar() {
  const { city, setCity } = useCityStore();
  const { user } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  // console.log("Navbar user:", user);
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-canvas border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT: LOGO + NAV */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <div className="text-xl font-semibold tracking-tight">
              <div
                className="flex items-center justify-center gap-0.5 cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                <img
                  src="/hero-logo.png"
                  alt="Logo"
                  className="size-12 image-contain"
                />
                <h1 className="">
                  <span className="text-[#F4C430]">Go</span>
                  <span className="text-[#16A34A]">BookIt</span>
                </h1>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLink label="Movies" />
              <NavLink label="Events" />
              <NavLink label="Offers" />
            </nav>
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {isDark ? "☀️" : "🌙"}
            </Button>
            <Select
              value={city}
              options={popularCities}
              placeholder="Select city"
              onChange={setCity}
            />

            {user ? (
              <UserMenu />
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
