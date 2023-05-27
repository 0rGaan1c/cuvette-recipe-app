require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const recipeRoutes = require("./routes/index");
const methodOverride = require("method-override");

const app = express();

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// Set up middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Add this line

// Set up routes
app.use("/", recipeRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
