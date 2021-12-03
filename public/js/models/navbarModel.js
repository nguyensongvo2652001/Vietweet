/*eslint-disable*/

import { sendRequest } from '../helper.js';

export const logout = async () => {
  try {
    await sendRequest('/api/v1/users/logout', 'GET');
  } catch (e) {
    throw e;
  }
};
