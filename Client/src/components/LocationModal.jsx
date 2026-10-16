
import { useEffect, useState } from "react";
import axios from "axios";
import { X, LocateFixed, Search } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function LocationModal({ isOpen, onClose, onSelectCity }) {
    const [search, setSearch] = useState("");
    const [cities, setCities] = useState([]);
    const [popular, setPopular] = useState([]);

    const [selectedLetter, setSelectedLetter] = useState("A");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch cities for search and alphabet filter
    useEffect(() => {
        if (!isOpen) return;

        const fetchCities = async () => {
            try {
                setLoading(true);
                setError("");

                const searchTerm = search.trim() || selectedLetter;

                const response = await axios.get(API_URL, {
                    params: {
                        search: searchTerm,
                        limit: 100,
                    },
                });

                setCities(response.data.data || []);
            } catch (err) {
                console.error("Cities API error:", err);
                setError("Cities load nahi hui. Backend check karo.");
                setCities([]);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchCities, 250);

        return () => clearTimeout(timer);
    }, [search, selectedLetter, isOpen]);

    // Fetch popular cities from backend
    useEffect(() => {
        if (!isOpen) return;

        const fetchPopularCities = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/popular`
                );
                console.log("Popular cities API response:", response.data);
                setPopular(response.data.data || []);
            } catch (err) {
                console.error("Popular cities error:", err);
                setPopular([]);
            }
        };

        fetchPopularCities();
    }, [isOpen]);

    if (!isOpen) return null;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const displayedCities = cities;



    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError("Browser not Supported.");
            return;
        }

        setLoading(true);
        setError("");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;

                    // Reverse geocoding API
                    const response = await axios.get(
                        "https://api.geoapify.com/v1/geocode/reverse",
                        {
                            params: {
                                lat: latitude,
                                lon: longitude,
                                format: "json",
                                apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY,
                            },
                        }
                    );


                    const result =
                        response.data.results?.[0] ||
                        response.data.features?.[0]?.properties;

                    console.log("Reverse geocoding response:", response.data);
                    console.log("Location result:", result);

                    const cityName =
                        result?.city ||
                        result?.town ||
                        result?.village ||
                        result?.municipality ||
                        result?.locality ||
                        result?.county ||
                        result?.state_district;

                    if (!cityName) {
                        setError("Location name nahi mila. Console check karo.");
                        return;
                    }

                    handleSelect({
                        city_name: cityName,
                        latitude,
                        longitude,
                    });


                    handleSelect({
                        city_name: cityName,
                        latitude,
                        longitude,
                    });
                } catch (err) {
                    console.error("Reverse geocoding error:", err);
                    setError("Loction Name Not Found");
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                setLoading(false);

                if (error.code === 1) {
                    setError("Browser settings location permission Allow .");
                } else if (error.code === 2) {
                    setError("Current location not available.");
                } else if (error.code === 3) {
                    setError("Location request timeout ,  try again");
                } else {
                    setError("Current location not detect ");
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 60000,
            }
        );
    };


    const handleSelect = (city) => {
        const selectedCity =
            typeof city === "string"
                ? {
                    city_name: city,
                    city_id: city,
                }
                : city;

        onSelectCity(selectedCity);

        setSearch("");
        setSelectedLetter("A");
        onClose();
    };


    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center
                       overflow-y-auto bg-black/50 p-2 pt-3 sm:p-6"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="location-title"
                className="relative my-auto w-full max-w-5xl rounded-[28px]
                           bg-white p-5 text-gray-800 shadow-2xl sm:p-8"
            >
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                    <h2
                        id="location-title"
                        className="text-xl font-semibold"
                    >
                        Select Location
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close location modal"
                        className="rounded-full p-2 hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search
                        size={20}
                        className="absolute left-4 top-1/2
                                   -translate-y-1/2 text-gray-400"
                    />

                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search city, area or locality"
                        className="w-full rounded-xl border border-gray-300
                                   py-3 pl-12 pr-4 outline-none
                                   focus:border-violet-500"
                    />
                </div>

                {/* Current Location */}

                <button
                    type="button"
                    onClick={handleCurrentLocation}
                    disabled={loading}
                    className="mt-5 flex items-center gap-3 font-semibold
               hover:text-violet-600 disabled:opacity-50"
                >
                    <LocateFixed className="text-violet-600" size={24} />
                    {loading ? "Detecting location..." : "Use Current Location"}
                </button>


                {/* Popular Cities */}
                {!search.trim() && (
                    <section className="mt-8">
                        <h3 className="mb-4 text-lg font-semibold">
                            Popular Cities
                        </h3>

                        <div
                            className="grid grid-cols-2 gap-3 sm:grid-cols-3
                                       md:grid-cols-4 lg:grid-cols-6"
                        >

                            {popular.map((city, index) => (
                                <button
                                    key={`${city}-${index}`}
                                    type="button"
                                    onClick={() => handleSelect(city)}
                                    className="flex min-h-20 items-center justify-center rounded-xl bg-violet-50 p-3 text-center font-medium transition hover:bg-violet-100"
                                >
                                    {typeof city === "string" ? city : city.city_name}
                                </button>
                            ))}

                        </div>
                    </section>
                )}

                {/* All Cities */}
                <section className="mt-8">
                    <h3 className="mb-4 text-lg font-semibold">
                        All Cities
                    </h3>

                    {!search.trim() && (
                        <div className="mb-5 flex flex-wrap gap-x-3 gap-y-2">
                            {alphabet.map((letter) => (
                                <button
                                    key={letter}
                                    type="button"
                                    onClick={() => setSelectedLetter(letter)}
                                    className={
                                        selectedLetter === letter
                                            ? "font-bold text-violet-600"
                                            : "text-gray-500"
                                    }
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    )}

                    {loading && (
                        <p className="py-5 text-gray-500">
                            Loading cities...
                        </p>
                    )}

                    {error && (
                        <p className="py-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {!loading && !error && displayedCities.length === 0 && (
                        <p className="py-5 text-gray-500">
                            City nahi mili.
                        </p>
                    )}

                    <div
                        className="grid max-h-64 grid-cols-2 gap-2
                                   overflow-y-auto sm:grid-cols-3
                                   md:grid-cols-4"
                    >
                        {!loading &&
                            !error &&
                            displayedCities.map((city) => (
                                <button
                                    key={city.city_id}
                                    type="button"
                                    onClick={() => handleSelect(city)}
                                    className="rounded-lg px-2 py-2 text-left
                                               hover:bg-violet-50 hover:text-violet-700"
                                >
                                    {city.city_name}
                                </button>
                            ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default LocationModal;
