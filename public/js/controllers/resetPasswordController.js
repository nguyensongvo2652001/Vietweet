/*eslint-disable*/

import resetPasswordView from '../views/resetPasswordView.js';
import * as resetPasswordModel from '../models/resetPasswordModel.js';
import { showAlert } from '../alert.js';
import { redirect } from '../helper.js';

const resetPassword = async (password, token) => {
  try {
    await resetPasswordModel.sendResetPasswordRequest(password, token);
    showAlert('success', 'Reset password successfully', 1.5);
    setTimeout(() => {
      redirect('/homepage');
    }, 1500);
  } catch (e) {
    resetPasswordView.insertError(e.message);
  }
};

const init = () => {
  resetPasswordView.addFormSubmitHandler(resetPassword);
};

init();
