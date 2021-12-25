/*eslint-disable*/
import tweetsView from '../views/tweetsView.js';
import * as tweetModel from '../models/tweetModel.js';
import { redirect } from '../helper.js';
import { showAlert } from '../alert.js';

const goToProfile = username => {
  redirect(`/profile/${username}`);
};

const goToTweetDetail = id => {
  redirect(`/tweet/${id}`);
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
    if (likeContainer.disabled) return;
    tweetsView.updateLikeContainerUI(likeContainer, 1);
    tweetsView.toggleDisabledLikeContainer(likeContainer);
    const like = await tweetModel.likeTweet(tweetId);
    tweetsView.setLikeContainerLikeId(likeContainer, like._id);
    tweetsView.toggleDisabledLikeContainer(likeContainer);
  } catch (e) {
    showAlert('error', e, 1.5);
  }
};

const dislikeTweet = async likeContainer => {
  try {
    if (likeContainer.disabled) return;
    tweetsView.updateLikeContainerUI(likeContainer, -1);
    const { likeId } = likeContainer.dataset;
    tweetsView.toggleDisabledLikeContainer(likeContainer);
    await tweetModel.dislikeTweet(likeId);
    tweetsView.toggleDisabledLikeContainer(likeContainer);
  } catch (e) {
    showAlert('error', e, 1.5);
  }
};

export const setTweetsListener = () => {
  tweetsView.findAllTweets();

  tweetsView.setTweetsAvatarClickListeners(goToProfile);
  tweetsView.setTweetsNameClickListeners(goToProfile);
  tweetsView.setTweetsClickListeners(goToTweetDetail);
  tweetsView.setTweetsReplyIconClickListeners(goToTweetDetail);
  tweetsView.setTweetsLikeIconClickListeners(clickLikeIconHandler);
};

const init = () => {
  setTweetsListener();
};

init();
