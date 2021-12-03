/*eslint-disable*/
import tweetsView from '../views/tweetsView.js';

export const setTweetsListener = () => {
  tweetsView.findAllTweets();
  tweetsView.setTweetsAvatarClickListeners();
  tweetsView.setTweetsNameClickListeners();
  tweetsView.setTweetsClickListeners();
};

const init = () => {
  setTweetsListener();
};

init();
