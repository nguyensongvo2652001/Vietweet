/*eslint-disable*/

import { sendRequest } from '../helper.js';

export const createReply = async data => {
  try {
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('tweet', data.tweet);
    if (data.image) formData.append('image', data.image);
    const responseData = await sendRequest(
      '/api/v1/replies',
      'POST',
      formData,
      true
    );
    const { reply } = responseData.data;
    return reply;
  } catch (e) {
    throw e;
  }
};
