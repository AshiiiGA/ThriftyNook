const Category = require('../models/categoryModel');

async function getAllCategories() {
  try {
    const categories = await Category.find({});
    return categories;
  } catch (err) {
    console.error('Error in getAllCategories:', err); // Log the error
    throw err;
  }
}

module.exports = {
  getAllCategories,
};
