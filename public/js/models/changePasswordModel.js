/*eslint-disable*/
import { sendRequest } from '../helper.js';

export const sendRequestChangePassword = async (
  currentPassword,
  newPassword
) => {
  try {
    await sendRequest('/api/v1/users/changePassword', 'PATCH', {
      currentPassword,
      newPassword
    });
  } catch (e) {
    throw e;
  }
};
