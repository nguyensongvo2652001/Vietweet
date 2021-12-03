/*eslint-disable*/

import navbarView from '../views/navbarView.js';
import * as navbarModel from '../models/navbarModel.js';
import { showAlert } from '../alert.js';
import { getRelativeUrl, redirect } from '../helper.js';

const setActiveLink = () => {
  const relativePath = getRelativeUrl();
  if (relativePath.startsWith('/homepage'))
    navbarView.setNavItemActive(navbarView.homeItem);
  if (relativePath.startsWith('/profile'))
    navbarView.setNavItemActive(navbarView.profileItem);
};

const homeItemClickHandler = () => {
  const relativePath = getRelativeUrl();
  if (relativePath.startsWith('/homepage')) return;
  redirect('/homepage');
  setActiveLink();
};

const profileItemClickHandler = () => {
  const relativePath = getRelativeUrl();
  if (relativePath.startsWith('/profile')) return;
  redirect(`/profile/me`);
  setActiveLink();
};

const logoutButtonClickHandler = async () => {
  try {
    await navbarModel.logout();
    redirect('/');
  } catch (e) {
    showAlert('error', 'Something went wrong', 2);
  }
};

const init = () => {
  setActiveLink();
  navbarView.addHomeClickListener(homeItemClickHandler);
  navbarView.addProfileClickListener(profileItemClickHandler);
  navbarView.addLogoutClickListener(logoutButtonClickHandler);
};

init();
