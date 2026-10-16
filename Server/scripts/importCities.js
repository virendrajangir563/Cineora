
require("dotenv").config();

const mongoose = require("mongoose");
const City = require("../models/City");
const cities = require("../data/cities.json");
const topCityKeys = require("../data/topCities");
const importCities = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Sirf cities collection ke purane records clear honge.
    // Isse doosri collections delete nahi hongi.
    await City.deleteMany({});

    const savedCities = await City.insertMany(cities);
    const result = await City.updateMany(
  { city_key: { $in: topCityKeys } },
  { $set: { is_top_city: true } }
);

console.log("Matched cities:", result.matchedCount);
console.log("Updated cities:", result.modifiedCount);
    console.log(
      `${savedCities.length} cities saved successfully`
    );
  } catch (error) {
    console.error("City import failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

importCities();
