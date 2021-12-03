/*eslint-disable*/

class LoginView {
  constructor() {
    this.loginButton = document.querySelector('.login-nav__login');
    this.signupButton = document.querySelector('.login-nav__signup');
    this.loginForm = document.querySelector('.form-login');
    this.signupForm = document.querySelector('.form-signup');
    this.signupFormSubmitButton = document.querySelector('.form-signup__btn');
    this.loginFormSubmitButton = document.querySelector('.form-login__btn');
    this.content = document.querySelector('.content');
  }

  setButtonActive(button) {
    button.classList.add('login-nav__item--active');
  }

  setFormActive(form) {
    form.classList.remove('hidden');
  }

  setButtonInactive(button) {
    button.classList.remove('login-nav__item--active');
  }

  setFormInactive(form) {
    form.classList.add('hidden');
  }

  setLoginFormActive() {
    this.setButtonActive(this.loginButton);
    this.setFormActive(this.loginForm);
  }

  setSignupFormActive() {
    this.setButtonActive(this.signupButton);
    this.setFormActive(this.signupForm);
  }

  setLoginFormInactive() {
    this.setButtonInactive(this.loginButton);
    this.setFormInactive(this.loginForm);
  }

  setSignupFormInactive() {
    this.setButtonInactive(this.signupButton);
    this.setFormInactive(this.signupForm);
  }

  hideError() {
    if (!this.errorElement) return;
    this.errorElement.remove();
  }

  showForm(login) {
    this.hideError();
    if (login) {
      this.setLoginFormActive();
      this.setSignupFormInactive();

      return;
    }
    this.setSignupFormActive();
    this.setLoginFormInactive();
  }

  addLoginButtonClickHandler(handler) {
    this.loginButton.addEventListener('click', handler);
  }

  addSignupButtonClickHandler(handler) {
    this.signupButton.addEventListener('click', handler);
  }

  addSignupFormSubmitHandler(handler) {
    this.signupFormSubmitButton.addEventListener(
      'click',
      this.signupFormSubmitHandler.bind(this, handler)
    );
  }

  addLoginFormSubmitHandler(handler) {
    this.loginFormSubmitButton.addEventListener(
      'click',
      this.loginFormSubmitHandler.bind(this, handler)
    );
  }

  clearForm(form) {
    const emailEl = form.querySelector('.email-input');
    const usernameEl = form.querySelector('.username-input');
    const passwordEl = form.querySelector('.password-input');

    if (emailEl) emailEl.value = '';
    if (usernameEl) usernameEl.value = '';
    if (passwordEl) passwordEl.value = '';

    this.hideError();
  }

  clearLoginForm() {
    this.clearForm(this.loginForm);
  }

  clearSignupForm() {
    this.clearForm(this.signupForm);
  }

  loginFormSubmitHandler(handler, event) {
    event.preventDefault();
    const username = this.loginForm.querySelector('.username-input').value;
    const password = this.loginForm.querySelector('.password-input').value;

    handler(username, password);
  }

  signupFormSubmitHandler(handler, event) {
    event.preventDefault();
    const email = this.signupForm.querySelector('.email-input').value;
    const username = this.signupForm.querySelector('.username-input').value;
    const password = this.signupForm.querySelector('.password-input').value;

    handler(email, username, password);
  }

  insertError(message) {
    if (this.errorElement) this.errorElement.remove();
    this.errorElement = document.createElement('p');
    this.errorElement.textContent = message;
    this.errorElement.classList.add('error');
    this.content.insertAdjacentElement('beforeend', this.errorElement);
  }
}

export default new LoginView();
