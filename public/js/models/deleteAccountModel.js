/*eslint-disable*/

import { sendRequest } from '../helper.js';

export const deleteAccount = async password => {
  try {
    await sendRequest('/api/v1/users/me', 'DELETE', { password });
  } catch (e) {
    throw e;
  }
};
