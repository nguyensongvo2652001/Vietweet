/*eslint-disable*/

import { sendRequest } from '../helper.js';

export const createTweet = async data => {
  try {
    const formData = new FormData();
    formData.append('content', data.content);
    if (data.image) formData.append('image', data.image);
    const responseData = await sendRequest(
      '/api/v1/tweets',
      'POST',
      formData,
      true
    );
    const { tweet } = responseData.data;
    return tweet;
  } catch (e) {
    throw e;
  }
};
