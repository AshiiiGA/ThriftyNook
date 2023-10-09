const Product = require('../models/Product');
const Category = require('../models/categoryModel');

// Render the post-ad page with categories
exports.getPostAdPage = async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.redirect('/login'); // Redirect to the login page if not logged in
    }

    // Retrieve categories from the database
    const categories = await Category.find();

    res.render('post-ad', { categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Handle the creation of a new product
exports.createProduct = async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.redirect('/login'); // Redirect to the login page if not logged in
    }

    const { condition, summary, description, price, location, material, category } = req.body;
    const userId = req.session.userId;

    const product = new Product({
      condition,
      summary,
      description,
      price: parseFloat(price), // Ensure price is a float
      location,
      material,
      category, // Assuming category is already a valid ObjectId
      user: userId, // Associate the product with the logged-in user
    });

    await product.save();

    // Redirect to a success page or home page
    res.redirect('/myaccount');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


// Get products by a specific user's userId
exports.getUserProducts = async (req, res) => {
  try {
    const userId = req.session.userId;

    // Find products that are associated with the specified userId and populate the 'category' field
    const products = await Product.find({ user: userId }).populate('category');

    // Render a page to display the products
    res.render('user-products', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

