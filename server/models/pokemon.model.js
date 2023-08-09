const mongoose = require("mongoose");

const PokemonSchema = {
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [2, "Name must be at least 2 characters"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
    minLength: [2, "Name must be at least 2 characters"],
  },
  description: {
    type: String,
    required: [false, ""],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    minLength: [2, "Location must be at least 2 characters"],
  }
};

module.exports = mongoose.model("Pokemon", PokemonSchema);