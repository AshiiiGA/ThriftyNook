const User = require('../models/User');
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
