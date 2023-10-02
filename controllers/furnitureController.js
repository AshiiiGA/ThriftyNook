const Furniture = require('../models/furnitureModel');

// Function to search and list furniture
async function searchFurniture(query) {
  try {
    // Define search criteria here based on the query parameter
    const searchCriteria = {}; //  customize this as needed

    const furnitures = await Furniture.find(searchCriteria);

    return furnitures;
  } catch (err) {
    console.error('Error in searchFurniture:', err);
    throw err;
  }
}

module.exports = {
  searchFurniture,
};
