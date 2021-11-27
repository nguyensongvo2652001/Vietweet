const catchAsync = require('../utils/catchAsync');

const loginViewController = (req, res, next) => {
  res.status(200).render('login');
};

module.exports = { loginViewController };
