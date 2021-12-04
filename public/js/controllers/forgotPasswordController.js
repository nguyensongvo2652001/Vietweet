/*eslint-disable*/
import * as forgotPasswordModel from '../models/forgotPasswordModel.js';
import forgotPasswordView from '../views/forgotPasswordView.js';

const forgotPassword = async username => {
  try {
    forgotPasswordView.addLoader();
    const message = await forgotPasswordModel.sendRequestForgotPassword(
      username
    );
    forgotPasswordView.showForgetPasswordFormMessage(message);
  } catch (e) {
    forgotPasswordView.clearLoader();
    forgotPasswordView.insertError(e.message);
  }
};

const init = () => {
  forgotPasswordView.addSearchButtonHandler(forgotPassword);
};

init();
