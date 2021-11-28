const catchAsync = require('../utils/catchAsync');

const loginViewController = (req, res, next) => {
  res.status(200).render('login');
};

const homepageViewController = (req, res, next) => {
  res.status(200).render('homepage');
};

module.exports = { loginViewController, homepageViewController };
