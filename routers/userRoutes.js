const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const catcontroller = require("../controllers/categoryController");
const furnitureController = require("../controllers/furnitureController");
const productController = require('../controllers/productController');
const middlewareController = require('../controllers/middlewareController');
const Category = require('../models/categoryModel')
paymentController = require('../controllers/payment.controller')
// Middleware function to check if the user is logged in
// this can be used for the all the routes that require authentication
function ensureLoggedIn(req, res, next) {
  if (req.session.userId) {
    // If the user is authenticated (logged in), proceed to the next middleware/route
    return next();
  } else {
    // If the user is not authenticated, redirect them to the login page or perform any desired action
    res.redirect('/login'); // Replace '/login' with your actual login page route
  }
}
// Middleware function to check if the requested user ID matches the current user's ID
function ensureRequestedUser(req, res, next) {
  const requestedUserId = req.params.userId;
  const currentUserId = req.session.userId;

  if (requestedUserId === currentUserId) {
    // If the requested user ID matches the current user's ID, proceed to the next middleware/route
    return next();
  } else {
    // If the user IDs do not match, display an error message and prevent access
    res.status(403).render('error', { message: 'Access Denied: You do not have permission to view this page.' });
  }
}

router.get('/', (req, res) => {
  res.render('index');
});

// Route to view product details and potentially make a payment
router.get('/payment/:productId', ensureLoggedIn, paymentController.viewProductDetails);


// Route to render the "Shipping" page
router.get('/shipping', (req, res) => {
  res.render('shipping'); // Assuming 'shipping' is the name of your EJS template
});

router.get('/paymentHistory', (req, res) => {
  res.render('paymentHistory', { product });
});

// Route to handle the payment submission
router.post('/submit-payment', (req, res) => {
  res.status(200).send('Payment successful');
});



router.get('/register', (req, res) => {
  res.render('register');
});


router.post('/register', userController.register);

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', userController.login);

router.get('/products', (req, res) => {
  if (!req.session.userId) {
    return res.render('products', { user: null });
  }
  res.render('products', { user: 'Logged In User' });
});

// Add this route to routes/userRoutes.js
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/');
    }
  });
});

function submitFuction(){
  $( "#yourmodal" ).load( "/showmodalroute" );
  }

router.get('/forgot-password', (req, res) => {
  res.render('forgot-password');
});

router.post('/reset-password', userController.resetPassword);
router.get('/myaccount',ensureLoggedIn, userController.myaccount);
router.get('/post-ad', ensureLoggedIn, productController.getPostAdPage);
// Handle the creation of a new product
router.post('/add-product', productController.createProduct);
router.get('/product/:productId', productController.viewProductById);
router.get('/user-products/:userId', ensureLoggedIn, ensureRequestedUser, productController.getProductsByUserID);
router.get('/payment-history/:productId', productController.viewProductById);
router.post('/add-to-wishlist', userController.addToWishlist);

router.get("/search", async (req, res) => {
  try {
    const categories = await catcontroller.getAllCategories(); // Fetch categories
    const query = req.query; // Access query parameters here
    const products = await furnitureController.searchFurniture(query); // Use searchFurniture function

    // Determine if the user is logged in
    const user = !!req.session.userId; // Set user to true if req.session.userId exists

    res.render("search", { categories, products, query, user }); // Pass the user variable and products to the template
  } catch (err) {
    res.status(500).render("error", { message: "Internal server error in route" });
  }
});

exports.renderSearchPage = async (req, res) => {
  try {
    // Assuming you have a way to determine if the user is logged in
    const user = req.session.userId ? true : false;

    // Fetch the furniture data or perform any other necessary operations
    const furnitures = await fetchFurnitureData();

    res.render('search', { furnitures, user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = router;
