/*eslint-disable*/

class ResetPasswordView {
  constructor() {
    this.parentElement = document.querySelector('.reset-password');
    this.resetPasswordForm = this.parentElement.querySelector(
      '.reset-password__form'
    );
    this.resetPasswordFormInput = this.resetPasswordForm.querySelector(
      '.reset-password__form-input'
    );
    this.resetPasswordFormSubmitButton = this.resetPasswordForm.querySelector(
      '.btn--reset-password'
    );
    this.resetPasswordMessageContainer = this.parentElement.querySelector(
      '.reset-password__message-container'
    );
    this.errorElement = null;
  }

  insertError(message) {
    if (!this.errorElement) this.errorElement = document.createElement('p');
    this.errorElement.classList.add('error');
    this.errorElement.textContent = message;
    this.resetPasswordForm.insertAdjacentElement(
      'beforeend',
      this.errorElement
    );
  }

  addFormSubmitHandler(handler) {
    this.resetPasswordFormSubmitButton.addEventListener(
      'click',
      this.formSubmitHandler.bind(this, handler)
    );
  }

  formSubmitHandler(handler, e) {
    e.preventDefault();
    const password = this.resetPasswordFormInput.value.trim();
    const { token } = this.parentElement.dataset;
    handler(password, token);
  }
}

export default new ResetPasswordView();
