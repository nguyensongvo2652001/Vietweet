const sinon = require('sinon');

const User = require('../../models/userModel');
const authController = require('../../controllers/authController');

const stubProtectMiddleware = () => {
  sinon.stub(authController, 'protect').callsFake(async (req, res, next) => {
    req.user = await User.findById(req.body.user);
    next();
  });
};

module.exports = { stubProtectMiddleware };
