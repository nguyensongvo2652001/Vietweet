/*eslint-disable*/

import { sendRequest } from '../helper.js';

export const likeTweet = async tweet => {
  try {
    const responseBody = await sendRequest('/api/v1/likes', 'POST', {
      tweet
    });
    const { like } = responseBody.data;
    return like;
  } catch (e) {
    throw e;
  }
};

export const dislikeTweet = async likeId => {
  try {
    await sendRequest(`/api/v1/likes/${likeId}`, 'DELETE');
  } catch (e) {
    throw e;
  }
};
