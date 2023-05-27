const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");

// Display all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.render("index", { recipes });
  } catch (err) {
    console.error("Error retrieving recipes", err);
    res.status(500).send("Internal Server Error");
  }
});

// Create a new recipe
router.post("/recipes", async (req, res) => {
  try {
    const { receipeName, receipeTime, ingredeints, serves } = req.body;
    const recipe = new Recipe({
      receipeName,
      receipeTime,
      ingredeints,
      serves,
    });

    await recipe.save();
    res.redirect("/");
  } catch (err) {
    console.error("Error saving recipe", err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a recipe
router.delete("/delete-recipe/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    await Recipe.findByIdAndDelete(recipeId);
    const recipes = await Recipe.find({});
    res.render("index", { recipes });
  } catch (err) {
    console.error("Error deleting recipe", err);
    res.status(500).send("Internal Server Error");
  }
});

// Update a recipe
router.put("/update-recipe/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const updates = req.body;
    await Recipe.findByIdAndUpdate(recipeId, updates);
    const recipes = await Recipe.find({});
    res.render("index", { recipes });
  } catch (err) {
    console.error("Error updating recipe", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
