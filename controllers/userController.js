const User = require('../models/User');
const Wishlist = require('../models/Wishlist');
const Cart = require('../models/cart');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { firstName, surname, mobileNumber, email, password, confirmPassword } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render('register', { error: 'Email already exists. Please use a different email.' });
    }

    if (password !== confirmPassword) {
      return res.render('register', { error: 'Passwords do not match. Please try again.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, surname, mobileNumber, email, password: hashedPassword });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    res.redirect('/myaccount');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.myaccount = async (req, res) => {
  try {
    if (req.session.userId) {
      // Use async/await to retrieve the user by ID
      const user = await User.findById(req.session.userId);

      if (!user) {
        return res.status(404).send('User not found');
      }

      res.render('myaccount', { user });
    } else {
      res.render('myaccount', { user: null });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('forgot-password', { error: 'User with this email does not exist.' });
    }

    // Check if the new password matches the confirmation
    if (password !== confirmPassword) {
      return res.render('forgot-password', { error: 'Passwords do not match. Please try again.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    // Redirect the user to the login page or a password reset confirmation page
    res.redirect('/login'); // You can customize the redirect URL

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.send('Please log in to add to your wishlist.'); // Return a message if not logged in
    }

    const { productId } = req.body;
    const userId = req.session.userId;

    // Check if the item is already in the user's wishlist
    const existingItem = await Wishlist.findOne({ userId, productId });

    if (existingItem) {
      return res.send('This product is already in your wishlist.');
    }

    const wishlistItem = new Wishlist({
      userId,
      productId,
    });

    await wishlistItem.save();

    res.send('Product added to your wishlist.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
exports.addToCart = async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.send('Please log in to add to your cart.'); // Return a message if not logged in
    }

    const { productId } = req.body;
    const userId = req.session.userId;

    // Check if the item is already in the user's wishlist
    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      return res.send('This product is already in your cart.');
    }

    const cartItem = new Cart({
      userId,
      productId,
    });

    await cartItem.save();

    res.send('Product added to your cart.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getCartItems = async (userId) => {
  try {
    const cartItems = await Cart.find({ userId: userId });
    return cartItems;
  } catch (err) {
    console.error('Error in getCartItems:', err); // Log the error
    throw err;
  }
}