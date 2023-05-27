const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  receipeName: String,
  receipeTime: String,
  ingredeints: [String],
  serves: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
