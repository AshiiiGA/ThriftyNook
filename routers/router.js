const express = require("express");
const router = express.Router();
const catcontroller = require("../controllers/categoryController");
const furnitureController = require("../controllers/furnitureController");

// Render the welcome page (index.ejs)
router.get("/", (req, res) => {
  res.render("index");
});

// Payment
router.get("/payment", (req, res) => {
  res.send("payment");
});

router.get("/search", async (req, res) => {
  try {
    const categories = await catcontroller.getAllCategories(); // Fetch categories
    const query = req.query; // Access query parameters here
    const furnitures = await furnitureController.searchFurniture(query);
    res.render("search", { categories, furnitures, query }); // Pass the query as a local variable
  } catch (err) {
    res
      .status(500)
      .render("error", { message: "Internal server error in route" });
  }
});
module.exports = router;
