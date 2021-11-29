/*eslint-disable*/

import tweetCreateView from '../views/tweetCreateView.js';
import * as tweetCreateModel from '../models/tweetCreateModel.js';

const submitHandler = async (content, image) => {
  try {
    if (content.trim().length === 0) return;

    const data = {
      content,
      image
    };

    await tweetCreateModel.createTweet(data);
  } catch (e) {
    console.log(e);
  }
};

const init = () => {
  tweetCreateView.setImageInputLivePreview();
  tweetCreateView.addOnSubmitHandler(submitHandler);
};

init();
