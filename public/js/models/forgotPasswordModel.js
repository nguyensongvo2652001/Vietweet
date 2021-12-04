/*eslint-disable*/
import { sendRequest } from '../helper.js';

export const sendRequestForgotPassword = async username => {
  try {
    const responseBody = await sendRequest(
      '/api/v1/users/forgotPassword',
      'PATCH',
      {
        username
      }
    );
    return responseBody.message;
  } catch (e) {
    throw e;
  }
};
