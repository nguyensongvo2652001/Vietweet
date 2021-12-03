/*eslint-disable*/

import changePasswordView from '../views/changePasswordView.js';
import * as changePasswordModel from '../models/changePasswordModel.js';
import { showAlert } from '../alert.js';

const changePassword = async (currentPassword, newPassword) => {
  try {
    await changePasswordModel.sendRequestChangePassword(
      currentPassword,
      newPassword
    );
    changePasswordView.closeChangePasswordForm();
    showAlert('success', 'Change password successfully', 1.5);
  } catch (e) {
    changePasswordView.insertError(e.message);
  }
};

const init = () => {
  changePasswordView.addChangePasswordButtonClickHandler();
  changePasswordView.addChangePasswordFormCancelClickHandler();
  changePasswordView.addChangePasswordFormBackdropClickHandler();
  changePasswordView.addChangePasswordFormSubmitClickHandler(changePassword);
};

init();
