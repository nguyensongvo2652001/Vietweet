/* eslint-disable*/
import * as loginState from '../models/loginModel.js';
import loginView from '../views/loginView.js';
import { showAlert } from '../alert.js';
import { redirect } from '../helper.js';

const loginButtonClickHandler = () => {
  if (loginState.state.isLogin) return;
  loginState.toggleIsLoginState();

  loginView.showForm(loginState.state.isLogin);
};

const signupButtonClickHandler = () => {
  if (!loginState.state.isLogin) return;
  loginState.toggleIsLoginState();

  loginView.showForm(loginState.state.isLogin);
};

const redirectToHomepage = () => {
  setTimeout(
    redirect.bind(null, 'homepage'),
    loginState.state.alertWaitSeconds * 1000
  );
};

const signUpFormSubmitHandler = async (email, username, password) => {
  try {
    await loginState.signUp(email, username, password);
    loginView.clearSignupForm();
    showAlert(
      'success',
      'Sign up successfully',
      loginState.state.alertWaitSeconds
    );
    redirectToHomepage();
  } catch (err) {
    loginView.insertError(err.message);
  }
};

const loginFormSubmitHandler = async (username, password) => {
  try {
    await loginState.login(username, password);
    loginView.clearLoginForm();
    showAlert(
      'success',
      'Login successfully',
      loginState.state.alertWaitSeconds
    );
    redirectToHomepage();
  } catch (err) {
    loginView.insertError(err.message);
  }
};

const formInit = () => {
  loginView.showForm(loginState.state.isLogin);
};

const init = () => {
  loginView.addLoginButtonClickHandler(loginButtonClickHandler);
  loginView.addSignupButtonClickHandler(signupButtonClickHandler);
  loginView.addSignupFormSubmitHandler(signUpFormSubmitHandler);
  loginView.addLoginFormSubmitHandler(loginFormSubmitHandler);
  formInit();
};

init();
