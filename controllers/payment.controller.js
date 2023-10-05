const Product = require('../models/Product');
const Payment = require('../models/payment.model');

exports.get = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect('/login');
    }

    const categories = await Category.find();

    res.render('post-ad', { categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.createProduct = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect('/login');
    }

    const { condition, summary, description, price, location, material, category } = req.body;
    const userId = req.session.userId;

    const product = new Product({
      condition,
      summary,
      description,
      price: parseFloat(price),
      location,
      material,
      category,
      user: userId, 
    });

    await product.save();

    res.redirect('/myaccount');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


exports.getUserProducts = async (req, res) => {
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