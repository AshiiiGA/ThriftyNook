const Furniture = require("../models/furnitureModel");

// Function to search and list furniture with category filter
async function searchFurniture(query) {
  try {
    const categoryFilter = query.category ? { category: query.category } : {}; // Filter by category if provided
    const furnitures = await Furniture.find(categoryFilter);

    return furnitures;
  } catch (err) {
    console.error("Error in searchFurniture:", err);
    throw err;
  }
}

module.exports = {
  searchFurniture,
};
