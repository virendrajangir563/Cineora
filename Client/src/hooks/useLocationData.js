
import { useState, useEffect } from "react";
import axios from "axios";

function useLocationData() {
  const [geoCoordinates, setGeoCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const [cityData, setCityData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (location) => {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        setGeoCoordinates({ latitude, longitude });

        try {
          const response = await axios.get(
            "https://api.geoapify.com/v1/geocode/reverse",
            {
              params: {
                lat: latitude,
                lon: longitude,
                limit: 1,
                lang: "en",
                format: "geojson",
                apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY,
              },
            }
          );

          const properties =
            response.data.features?.[0]?.properties;

          if (properties) {
            setCityData(properties);
          }
        } catch (err) {
          setError("Unable to fetch city details.");
          console.error("Location API error:", err);
        }
      },
      (err) => {
        setError(err.message || "Unable to access your location.");
      }
    );
  }, []);

  return {
    geoCoordinates,
    cityData,
    error,
  };
}

export default useLocationData;
