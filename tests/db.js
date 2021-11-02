const mongoose = require('mongoose');

const User = require('../models/userModel');

const connectToDatabase = async () => {
  const db = process.env.DB_STRING.replace(
    /<password>/,
    process.env.DB_PASSWORD
  );

  await mongoose.connect(db);
};

const initializeDatabase = async () => {
  await User.deleteMany();
};

module.exports = { connectToDatabase, initializeDatabase };
