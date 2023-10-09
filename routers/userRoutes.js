const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const catcontroller = require("../controllers/categoryController");
const furnitureController = require("../controllers/furnitureController");
const productController = require('../controllers/productController');
const { viewProductById, product } = require('../controllers/productController');

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

router.get('/paymentHistory', (req, res) => {
  res.render('paymentHistory', { product });
});

// Route to handle the payment submission
router.post('/submit-payment', (req, res) => {
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

    // Determine if the user is logged in
    const user = !!req.session.userId; // Set user to true if req.session.userId exists

    res.render("search", { categories, furnitures, query, user }); // Pass the user variable to the template
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

router.get('/forgot-password', (req, res) => {
  res.render('forgot-password');
});

router.post('/reset-password', userController.resetPassword);
router.get('/myaccount', userController.myaccount);
router.get('/post-ad', productController.getPostAdPage);
// Handle the creation of a new product
router.post('/add-product', productController.createProduct);
router.get('/product/:productId', productController.viewProductById);
router.get('/user-products/:userId', productController.getUserProducts);
router.get('/payment-history/:productId', productController.viewProductById);



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

<<<<<<< HEAD
router.get('/cart',async (req,res) => {
  try{
    cartItems = await userController.getCartItems(req.session.userId);
    products = await furnitureController.getAllFurniture();
    productIds = []
    cartItems.forEach((item, index) => {
      productIds.push(item.productId.toString());
    });
    console.log(productIds,cartItems);
    productsDetails=[]
    products.forEach((item, index) => {
      itemId = item._id.toString()
      console.log(itemId);
      if (productIds.includes(itemId)){
      productsDetails.push(item);
      }
    });
    console.log(productsDetails);
    user = req.session.userId;
    res.render('cart',{ productsDetails})

  }
catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
});

router.post('/add-to-wishlist', userController.addToWishlist);

router.post('/add-to-cart', userController.addToCart);

=======
router.post('/add-to-wishlist', userController.addToWishlist);
>>>>>>> a8f4f4c7714756a28610f6ad0e8ec72228e932e7

module.exports = router;
