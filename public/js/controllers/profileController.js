/*eslint-disable*/
import profileView from '../views/profileView.js';
import editProfileFormView from '../views/editProfileFormView.js';
import tweetsView from '../views/tweetsView.js';
import * as editProfileModel from '../models/editProfileModel.js';
import { redirect } from '../helper.js';

const goToFollowList = (username, following) => {
  redirect(`/profile/${username}/follow?following=${following}`);
};

const submitEditProfileFormHandler = async data => {
  try {
    const user = await editProfileModel.editProfile(data);
    profileView.updateProfileUI(user);
    tweetsView.updateTweetsUI(user);
    editProfileFormView.closeForm();
  } catch (e) {
    editProfileFormView.insertErrorToEditProfileForm(e.message);
    console.log(e);
  }
};

const init = () => {
  profileView.addProfileFollowItemsClickListener(goToFollowList);
  editProfileFormView.addSaveButtonClickHandler(submitEditProfileFormHandler);
};

init();
