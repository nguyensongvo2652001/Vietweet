/*eslint-disable*/

import replyCreateView from '../views/replyCreateView.js';
import tweetView from '../views/tweetView.js';
import { setTweetsListener } from './tweetsController.js';
import * as replyCreateModel from '../models/replyCreateModel.js';

const insertReplyToReplies = reply => {
  const replyHTML = tweetView.getReplyHTML(reply);
  replyCreateView.insertTweetToTweets(replyHTML);
};

const submitHandler = async (content, image, tweet) => {
  try {
    if (content.trim().length === 0) return;

    const data = {
      content,
      image,
      tweet
    };

    const reply = await replyCreateModel.createReply(data);

    insertReplyToReplies(reply);

    replyCreateView.updateRepliesNumber();

    setTweetsListener();

    replyCreateView.clear();
  } catch (e) {
    console.log(e);
  }
};

const init = () => {
  replyCreateView.setImageInputLivePreview();
  replyCreateView.addOnSubmitHandler(submitHandler);
  replyCreateView.setTweetContentOnChange();
  replyCreateView.clear();
};

init();
