import Button from "../ui/Button";
import { NavLink } from "../ui/Navlink";
import Select from "../ui/Select";
import { useCityStore } from "../../store/cityStore";
import { popularCities } from "../../utils/data/cities";

export default function Navbar() {
  const { city, setCity } = useCityStore();

  return (
    <header className="sticky top-0 z-50 bg-canvas border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT: LOGO + NAV */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <div className="text-xl font-semibold tracking-tight">
              <div className="flex items-center justify-center gap-2">
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
              <NavLink label="Cinemas" />
              <NavLink label="Offers" />
            </nav>
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-3">
            <Select
              value={city}
              options={popularCities}
              placeholder="Select city"
              onChange={setCity}
            />
            <Button variant="primary">Sign In</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
