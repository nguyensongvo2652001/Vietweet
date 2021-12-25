/*eslint-disable*/

import tweetCreateView from '../views/tweetCreateView.js';
import tweetView from '../views/tweetView.js';
import { setTweetsListener } from './tweetsController.js';
import * as tweetCreateModel from '../models/tweetCreateModel.js';
import { redirect } from '../helper.js';
import { showAlert } from '../alert.js';

const insertTweetToFeed = tweet => {
  const tweetHtml = tweetView.getTweetHTML(tweet);
  tweetCreateView.insertTweetToTweets(tweetHtml);
};

const submitHandler = async (content, image) => {
  try {
    if (content.trim().length === 0) return;

    const data = {
      content,
      image
    };

    const tweet = await tweetCreateModel.createTweet(data);

    insertTweetToFeed(tweet);

    setTweetsListener();

    tweetCreateView.clear();
  } catch (e) {
    showAlert('error', 'Something went wrong', 1.5);
  }
};

const goToProfile = () => {
  redirect('/profile/me');
};

const init = () => {
  tweetCreateView.setImageInputLivePreview();
  tweetCreateView.addOnSubmitHandler(submitHandler);
  tweetCreateView.setTweetContentOnChange();
  tweetCreateView.setTweetFormAvatarClickHandler(goToProfile);
  tweetCreateView.clear();
};

init();
