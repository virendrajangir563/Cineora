
const City = require("../models/City");

const getCities = async (req, res) => {
  try {
    
const search = (req.query.search || "").trim();

const filter = {};

if (search) {
  filter.city_name = {
    $regex: `^${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
    $options: "i",
  };
}

console.log("Search received:", search);
console.log("Filter:", filter);

const cities = await City.find(filter).limit(100);


    res.status(200).json({
      success: true,
      count: cities.length,
      data: cities,
    });
  } catch (error) {
    console.error("City search error:", error.message);

    res.status(500).json({
      success: false,
      message: "Cities fetch karne mein error aaya",
    });
  }
};

const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City nahi mili",
      });
    }

    res.status(200).json({
      success: true,
      data: city,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid city ID",
    });
  }
};

module.exports = {
  getCities,
  getCityById,
};
