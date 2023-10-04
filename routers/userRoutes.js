const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const catcontroller = require("../controllers/categoryController");
const furnitureController = require("../controllers/furnitureController");

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/payment', (req, res) => {
  res.render('payment');
})

// Route to render the "Shipping" page
router.get('/shipping', (req, res) => {
  res.render('shipping'); // Assuming 'shipping' is the name of your EJS template
});

// Route to handle the payment submission
router.post('/submit-payment', (req, res) => {
  // Handle the payment submission logic here
  // You can access the form data from req.body, e.g., req.body.name, req.body.card, etc.

  // For demonstration purposes, we'll assume a successful payment submission
  // In a real application, you should implement your payment processing logic here

  // Send a success response
  res.status(200).send('Payment successful');
});
router.get('/payment-history', (req, res) => {
  res.render('paymentHistory');
})

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

module.exports = router;
