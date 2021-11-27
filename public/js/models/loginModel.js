/*eslint-disable*/
import { sendRequest } from '../helper.js';

export const state = {
  isLogin: false
};

export const toggleIsLoginState = () => {
  state.isLogin = !state.isLogin;
};

export const signUp = async (email, username, password) => {
  try {
    await sendRequest('/api/v1/users/signup', 'POST', {
      username,
      email,
      password
    });
  } catch (err) {
    throw err;
  }
};

export const login = async (username, password) => {
  console.log(username, password);
  try {
    await sendRequest('/api/v1/users/login', 'POST', {
      username,
      password
    });
  } catch (err) {
    throw err;
  }
};
