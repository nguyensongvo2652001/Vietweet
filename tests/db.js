const fs = require('fs');

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

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/fixtures/users.json`, 'utf-8')
);

const apiVersion = process.env.API_VERSION;
const apiBasePath = `/api/v${apiVersion}`;

module.exports = { connectToDatabase, initializeDatabase, users, apiBasePath };
