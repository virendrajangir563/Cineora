
const express = require("express");
const router = express.Router();

const cities = require("../data/cities.json");
const getPopularCities = require("../data/popularCities");

// GET /api/cities
// GET /api/cities?search=jaipur
// GET /api/cities?state=Rajasthan
// GET /api/cities?page=1&limit=10

router.get("/", (req, res) => {
  try {
    const search = (req.query.search || "").trim().toLowerCase();
    const state = (req.query.state || "").trim().toLowerCase();

    const page = Math.max(
      1,
      Number.parseInt(req.query.page, 10) || 1
    );

    const requestedLimit =
      Number.parseInt(req.query.limit, 10) || 100;

    const limit = Math.min(100, Math.max(1, requestedLimit));

    // Search by city name and filter by state
    const filteredCities = cities.filter((city) => {
      const cityName = (city.city_name || "").trim().toLowerCase();
      const stateName = (city.state_name || "").trim().toLowerCase();

      const matchesSearch = cityName.startsWith(search);
      const matchesState = !state || stateName === state;

      return matchesSearch && matchesState;
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const results = filteredCities.slice(
      startIndex,
      startIndex + limit
    );

    return res.status(200).json({
      success: true,
      total: filteredCities.length,
      page,
      limit,
      data: results,
    });
  } catch (error) {
    console.error("Cities API error:", error);

    return res.status(500).json({
      success: false,
      message: "Cities fetch karne mein problem hui.",
    });
  }
});

// GET /api/cities/popular
router.get("/popular", (req, res) => {
  try {
    const popular = getPopularCities;

    return res.status(200).json({
      success: true,
      count: popular.length,
      data: popular,
    });
  } catch (error) {
    console.error("Popular cities error:", error);

    return res.status(500).json({
      success: false,
      message: "Popular cities fetch nahi ho paayi.",
    });
  }
});

// GET /api/cities/:id
router.get("/:id", (req, res) => {
  const city = cities.find(
    (item) => String(item.city_id) === req.params.id
  );

  if (!city) {
    return res.status(404).json({
      success: false,
      message: "City nahi mili.",
    });
  }

  return res.status(200).json({
    success: true,
    data: city,
  });
});

module.exports = router;
