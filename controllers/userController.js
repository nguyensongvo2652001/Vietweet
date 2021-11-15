const User = require('../models/userModel');
const handlerFactory = require('../controllers/handlerFactory');

const getUser = handlerFactory.getOne(User, 'user');

module.exports = { getUser };
