
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

import LocationModal from "./LocationModal";
import useLocationData from "../hooks/useLocationData";

function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const navigate = useNavigate();

  const { cityData, error } = useLocationData();

  const handleLogout = async () => {
    await onLogout();
    setMenuOpen(false);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "border-b-2 border-purple-600 pb-2 font-semibold text-purple-600"
      : "pb-2 text-gray-700 hover:text-purple-600";

  const closeMenu = () => setMenuOpen(false);

  const cityName =
    selectedCity?.city_name ||
    cityData.city ||
    cityData.town ||
    cityData.village ||
    "Select Location";

  const stateName =
    selectedCity?.state_name || cityData.state || "";

  return (
    <>
      <nav className="relative flex items-center justify-between bg-white p-4 shadow">
        {/* Logo and Location */}
        <div className="flex items-center gap-5">
          <NavLink to="/Home">
            <img
              src="/cineora-logo.svg"
              alt="Cineora"
              className="h-9"
            />
          </NavLink>

          <button
            type="button"
            onClick={() => setLocationModalOpen(true)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-800 hover:bg-purple-50"
          >
            <MapPin size={20} className="text-purple-600" />

            <span className="flex flex-col items-start">
              <span className="text-sm font-semibold">
                {cityName}
              </span>

              <span className="text-xs text-gray-500">
                {stateName}
              </span>
            </span>
          </button>
        </div>

        {/* Center Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/Home" className={navLinkClass}>
            For You
          </NavLink>

          <NavLink to="/movies" className={navLinkClass}>
            Movies
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-5 md:flex">
          {/* <NavLink to="/Home">Home</NavLink> */}

          {user ? (
            <>
              <span>{user.name || user.email}</span>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded bg-purple-600 px-4 py-2 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute right-4 top-full z-50 flex min-w-40 flex-col gap-4 rounded-lg bg-white p-5 shadow-lg md:hidden">
            <NavLink to="/Home" onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink to="/Home" onClick={closeMenu}>
              For You
            </NavLink>

            <NavLink to="/movies" onClick={closeMenu}>
              Movies
            </NavLink>

            {user ? (
              <>
                <span>{user.name || user.email}</span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={closeMenu}>
                  Login
                </NavLink>

                <NavLink to="/signup" onClick={closeMenu}>
                  Signup
                </NavLink>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Location Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        onSelectCity={(city) => {
          setSelectedCity(city);
          setLocationModalOpen(false);
        }}
      />

      {/* Optional location error */}
      {error && (
        <p className="px-4 py-1 text-xs text-gray-500">
          Automatic location unavailable. Select your city manually.
        </p>
      )}
    </>
  );
}

export default Navbar;
