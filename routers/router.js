const express = require('express');
const router = express.Router();
const catcontroller = require('../controllers/categoryController');
const furnitureController = require('../controllers/furnitureController');


// Render the welcome page (index.ejs)
router.get('/', (req, res) => {
  res.render('index');
});

// Search furniture route (GET request)
router.get('/search', async (req, res) => {
  try {
    const categories = await catcontroller.getAllCategories(); // Fetch categories
    const query = req.query; // You can access query parameters here
    const furnitures = await furnitureController.searchFurniture(query);
    res.render('search', { categories, furnitures }); // Replace 'merged-template' with your actual template name
  } catch (err) {
    res.status(500).render('error', { message: 'Internal server error in route' });
  }
});

/*
// Render the category page (category.ejs)
router.get('/categories', async (req, res) => {
  try {
    const categories = await catcontroller.getAllCategories();
    res.render('category', { categories });
  } catch (err) {
    res.status(500).render('error', { message: 'Internal server error in route' });
  }
});
// Search furniture route (GET request)
router.get('/search', async (req, res) => {
  try {
    const query = req.query; // You can access query parameters here
    const furnitures = await furnitureController.searchFurniture(query);
    res.render('search', { furnitures });
  } catch (err) {
    res.status(500).render('error', { message: 'Internal server error in route' });
  }
});
*/
module.exports = router;
