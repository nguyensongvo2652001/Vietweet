/*eslint-disable*/
import profileView from '../views/profileView.js';
import editProfileFormView from '../views/editProfileFormView.js';
import tweetsView from '../views/tweetsView.js';
import deleteAccountFormView from '../views/deleteAccountFormView.js';
import * as editProfileModel from '../models/editProfileModel.js';
import * as deleteAccountModel from '../models/deleteAccountModel.js';
import { redirect, logout } from '../helper.js';
import { showAlert } from '../alert.js';

const goToFollowList = (username, following) => {
  redirect(`/profile/${username}/follow?following=${following}`);
};

const submitDeleteAccountFormHandler = async password => {
  try {
    if (!password) return;
    await deleteAccountModel.deleteAccount(password);
    showAlert(
      'success',
      'You have deleted your account successfully. We will log you out soon',
      1.5
    );
    editProfileFormView.closeForm();
    setTimeout(() => {
      logout();
      redirect('/');
    }, 1500);
  } catch (e) {
    deleteAccountFormView.insertError(e.message);
  }
};

const submitEditProfileFormHandler = async data => {
  try {
    const user = await editProfileModel.editProfile(data);
    profileView.updateProfileUI(user);
    tweetsView.updateTweetsUI(user);
    editProfileFormView.clearForm();
    editProfileFormView.closeForm();
  } catch (e) {
    editProfileFormView.insertErrorToEditProfileForm(e.message);
  }
};

const init = () => {
  profileView.addProfileFollowItemsClickListener(goToFollowList);
  editProfileFormView.addSaveButtonClickHandler(submitEditProfileFormHandler);
  deleteAccountFormView.addDeleteAccountFormSubmitListener(
    submitDeleteAccountFormHandler
  );
};

init();
