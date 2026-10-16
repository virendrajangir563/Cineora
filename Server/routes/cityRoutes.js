const express = require("express");
const router = express.Router();

const cities = require("../data/cities.json");

// GET /api/cities
// GET /api/cities?search=jaipur
// GET /api/cities?state=Rajasthan
// GET /api/cities?page=1&limit=10

router.get("/", (req, res) => {
  try {
    const search = (req.query.search || "").trim().toLowerCase();
    const state = (req.query.state || "").trim().toLowerCase();

    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const requestedLimit = Number.parseInt(req.query.limit, 10) || 100;
    const limit = Math.min(100, Math.max(1, requestedLimit));

    // Step A: Search aur state ke according filter
    
    // Step A: Search aur state ke according filter
    

const filteredCities = cities.filter((city) => {
  const cityName = city.city_name?.trim().toLowerCase() || "";

  return !search || cityName.startsWith(search);
});

    // Step B: Pagination
    const startIndex = (page - 1) * limit;
    const results = filteredCities.slice(startIndex, startIndex + limit);

    // Step C: Response
    res.status(200).json({
      success: true,
      total: filteredCities.length,
      page,
      limit,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cities fetch karne mein problem hui.",
    });
  }
});

// GET /api/cities/282
// Ek city ko ID se find karna
router.get("/:id", (req, res) => {
  const city = cities.find(
    (item) => item.city_id === req.params.id
  );

  if (!city) {
    return res.status(404).json({
      success: false,
      message: "City nahi mili.",
    });
  }

  res.status(200).json({
    success: true,
    data: city,
  });
});

module.exports = router;