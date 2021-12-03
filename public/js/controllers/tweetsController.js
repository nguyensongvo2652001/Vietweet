/*eslint-disable*/
import tweetsView from '../views/tweetsView.js';
import * as tweetModel from '../models/tweetModel.js';
import { redirect } from '../helper.js';
import { showAlert } from '../alert.js';

const goToProfile = username => {
  redirect(`/profile/${username}`);
};

const clickLikeIconHandler = async (likeContainer, tweetId) => {
  try {
    if (likeContainer.classList.contains('tweet__data-container--liked'))
      await dislikeTweet(likeContainer);
    else await likeTweet(likeContainer, tweetId);
  } catch (e) {
    showAlert('error', e, 1.5);
  }
};

const likeTweet = async (likeContainer, tweetId) => {
  try {
    const like = await tweetModel.likeTweet(tweetId);
    tweetsView.updateLikeContainerUI(likeContainer, like._id);
  } catch (e) {
    console.log(e);
    showAlert('error', e, 1.5);
  }
};

const dislikeTweet = async likeContainer => {
  try {
    const { likeId } = likeContainer.dataset;
    await tweetModel.dislikeTweet(likeId);
    tweetsView.updateLikeContainerUI(likeContainer);
  } catch (e) {
    console.log(e);
    showAlert('error', e, 1.5);
  }
};

export const setTweetsListener = () => {
  tweetsView.findAllTweets();

  tweetsView.setTweetsAvatarClickListeners(goToProfile);
  tweetsView.setTweetsNameClickListeners(goToProfile);
  tweetsView.setTweetsClickListeners();

  tweetsView.setTweetsLikeIconClickListeners(clickLikeIconHandler);
};

const init = () => {
  setTweetsListener();
};

init();
