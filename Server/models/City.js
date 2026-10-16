const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    city_id: {
      type: String,
      required: true,
    },

    city_name: {
      type: String,
      required: true,
      trim: true,
    },

    city_lat: Number,
    city_long: Number,

    state_name: String,
    city_key: String,
    cleaned_city_name: String,

    city_image: String,
    city_light_image: String,
    is_popular_city: Boolean,

    sub_cities: [mongoose.Schema.Types.Mixed],
    
    is_top_city: {
  type: Boolean,
  default: false,
},
  },
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("City", citySchema);