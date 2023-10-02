const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // Add mongoose
const router = require('./routers/router');
const path = require('path'); // Add this line

dotenv.config();

const app = express();
const { PORT, DB_URI } = process.env; // Add DB_URI

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to the database!'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

app.use('/', router); // Use the router for handling routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
