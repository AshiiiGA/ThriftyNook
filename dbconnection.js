const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { DB_URI } = process.env;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database.');
});

module.exports = mongoose;
