const path = require('path');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');

module.exports = async () => {
  dotenv.config({ path: path.resolve(__dirname, '../env/test.env') });
};
