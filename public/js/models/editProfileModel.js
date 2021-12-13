/*eslint-disable*/

import { sendRequest } from '../helper.js';

export const editProfile = async data => {
  try {
    const formData = new FormData();
    for (let key of Object.keys(data)) formData.append(key, data[key]);

    const responseBody = await sendRequest(
      '/api/v1/users/me',
      'PATCH',
      formData,
      true
    );
    const { user } = responseBody.data;
    return user;
  } catch (e) {
    throw e;
  }
};
