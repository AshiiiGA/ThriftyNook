const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();
const { PORT, DB_URI, SESSION_SECRET } = process.env;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to the database!'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure sessions
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true in a production environment with HTTPS
      maxAge: 86400000, // Session duration in milliseconds (e.g., 1 day)
    },
  })
);
app.use((req, res, next) => {
  res.locals.userSession = req.session.userId;
  next();
});
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

// Import and use userRoutes
const userRoutes = require('./routers/userRoutes');
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
