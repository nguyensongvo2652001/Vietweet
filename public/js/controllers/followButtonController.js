/*eslint-disable*/

import followButtonView from '../views/followButtonView.js';
import * as followButtonModel from '../models/followButtonModel.js';
import { showAlert } from '../alert.js';

const createFolllow = async following => {
  try {
    const follow = await followButtonModel.createNewFollow(following);
    followButtonView.updateFollowButtonUI();
    followButtonView.updateFollowersCount(1);
    followButtonView.addFollowIdToFollowButton(follow._id);
  } catch (e) {
    throw e;
  }
};

const unfollow = async followId => {
  try {
    await followButtonModel.unfollow(followId);
    followButtonView.updateFollowButtonUI();
    followButtonView.updateFollowersCount(-1);
  } catch (e) {
    throw e;
  }
};

const followButtonHandler = async (followed, data) => {
  try {
    if (!followed) return await createFolllow(data.following);
    await unfollow(data.followId);
  } catch (e) {
    showAlert('error', 'Something went wrong', 1.5);
  }
};

const init = () => {
  followButtonView.addFollowButtonClickHandler(followButtonHandler);
};

init();
