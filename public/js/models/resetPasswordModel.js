/*eslint-disable*/

import { sendRequest } from '../helper.js';

export const sendResetPasswordRequest = async (password, resetToken) => {
  try {
    await sendRequest(`/api/v1/users/resetPassword/${resetToken}`, 'PATCH', {
      password
    });
  } catch (e) {
    throw e;
  }
};
