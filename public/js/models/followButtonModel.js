/*eslint-disable*/

import { sendRequest } from '../helper.js';

export const createNewFollow = async following => {
  try {
    const requestBody = await sendRequest('/api/v1/follows', 'POST', {
      following
    });

    const { follow } = requestBody.data;
    return follow;
  } catch (e) {
    throw e;
  }
};

export const unfollow = async followId => {
  try {
    await sendRequest(`/api/v1/follows/${followId}`, 'DELETE');
  } catch (e) {
    throw e;
  }
};
