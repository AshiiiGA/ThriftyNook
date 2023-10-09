const Product = require("../models/Product");
const Category = require("../models/categoryModel");

async function searchFurniture(query) {
  try {
    const categoryNames = Array.isArray(query.category) ? query.category : [query.category];

    // Find the category IDs corresponding to the provided category names
    const categories = await Category.find({ name: { $in: categoryNames } });

    const categoryIds = categories.map(category => category._id);

    // Use the category IDs to filter products
    const products = await Product.find({ category: { $in: categoryIds } });

    return products;
  } catch (err) {
    console.error("Error in searchFurniture:", err);
    throw err;
  }
}

module.exports = {
  searchFurniture,
};
