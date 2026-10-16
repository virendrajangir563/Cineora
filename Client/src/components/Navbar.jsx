
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin } from "lucide-react";
import LocationModal from "./LocationModal";

function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const [geoCoordinates, setGeoCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const [cityData, setCityData] = useState({});
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleLogout = async () => {
    await onLogout();
    navigate("/login");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      axios
        .get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${location.coords.latitude
          }&lon=${location.coords.longitude
          }&limit=1&lang=en&format=geojson&apiKey=${import.meta.env.VITE_GEOAPI_KEY
          }`
        )
        .then((res) =>
          setCityData({ ...res.data.features[0].properties })
        );

      setGeoCoordinates({
        ...geoCoordinates,
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      });
    });
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between bg-white p-4 shadow">
        {/* Logo */}
        <div className="flex items-center gap-5">
          <NavLink to="/Home">
            <img
              src="/cineora-logo.svg"
              alt="Cineora"
              className="h-9"
            />
          </NavLink>

          {/* Location */}
          <button
            onClick={() => setLocationModalOpen(true)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-800 hover:bg-purple-50"
          >
            <MapPin size={20} className="text-purple-600" />

            
            <span className="flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-800">
                {selectedCity?.city_name || cityData.city || "Select Location"}
              </span>

              <span className="text-xs text-gray-500">
                {selectedCity?.state_name || cityData.state || " "}
              </span>
            </span>
          </button>
        </div>

        
{/* Center Navigation */}
<div className="hidden items-center gap-8 md:flex">
  <NavLink
    to="/Home"
    className={({ isActive }) =>
      isActive
        ? "border-b-2 border-purple-600 pb-2 font-semibold text-purple-600"
        : "pb-2 text-gray-700 hover:text-purple-600"
    }
  >
    For You
  </NavLink>

  <NavLink
    to="/movies"
    className={({ isActive }) =>
      isActive
        ? "border-b-2 border-purple-600 pb-2 font-semibold text-purple-600"
        : "pb-2 text-gray-700 hover:text-purple-600"
    }
  >
    Movies
  </NavLink>
</div>


        {/* Desktop Menu */}
        <div className="hidden items-center gap-5 md:flex">
          <NavLink to="/Home">Home</NavLink>

          {user ? (
            <>
              <span>{user.name || user.email}</span>

              <button
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
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute right-4 top-16 flex flex-col gap-4 rounded bg-white p-5 shadow md:hidden">
            <NavLink
              to="/Home"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            {user ? (
              <>
                <span>{user.name || user.email}</span>

                <button onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                >
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
        onSelectCity={(city) => setSelectedCity(city)}
      />
    </>
  );
}

export default Navbar;
