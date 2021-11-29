/*eslint-disable*/

import { sendRequest } from '../helper.js';

export const createTweet = async data => {
  try {
    const formData = new FormData();
    formData.append('content', data.content);
    if (data.image) formData.append('image', data.image);
    await sendRequest('/api/v1/tweets', 'POST', formData, true);
  } catch (e) {
    throw e;
  }
};
