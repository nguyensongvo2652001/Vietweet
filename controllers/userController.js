const User = require('../models/userModel');
const handlerFactory = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const filterObject = require('../utils/filterObject');

const getUser = handlerFactory.getOne(User, 'user');

const updateMe = catchAsync(async (req, res, next) => {});

module.exports = { getUser };
