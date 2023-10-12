const Product = require('../models/Product');
const Category = require('../models/categoryModel');
const upload = require('../multer-config'); // Adjust the path to your multer configuration


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

exports.createProduct = async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.redirect('/login'); // Redirect to the login page if not logged in
    }

    // Handle image upload
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Image upload failed');
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
        image: req.file.filename, // Store the image ID or filename
      });

      await product.save();

      // Redirect to a success page or home page
      res.redirect('/myaccount');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Get products by a specific user's userId
exports.getProductsByUserID = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find products that are associated with the specified userId and populate the 'category' field
    const products = await Product.find({ user: userId }).populate('category');

    // Render a page to display the products
    res.render('user-products', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// View a product by its ID
exports.viewProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by its ID
    const product = await Product.findById(productId);

    if (!product) {
      // Handle the case when the product with the given ID doesn't exist
      return res.status(404).send('Product not found');
    }

    // Render a view to display the product details
    // res.render('product-details', { product });
    res.render('product-details', { product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};