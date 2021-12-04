/*eslint-disable*/

class ForgotPasswordView {
  constructor() {
    this.forgotPasswordContainer = document.querySelector('.forgot-password');
    this.forgotPasswordForm = this.forgotPasswordContainer.querySelector(
      '.forgot-password__form'
    );
    this.forgotPasswordFormInput = this.forgotPasswordForm.querySelector(
      '.forgot-password__form-input'
    );
    this.forgotPasswordMessageContainer = this.forgotPasswordContainer.querySelector(
      '.forgot-password__message-container'
    );
    this.forgotPasswordMessage = this.forgotPasswordMessageContainer.querySelector(
      '.forgot-password__message'
    );
    this.errorElement = null;
    this.loader = null;
  }

  addLoader() {
    this.loader = document.createElement('div');
    this.loader.classList.add('loader');
    this.loader.style = 'align-self: center';
    this.forgotPasswordForm.insertAdjacentElement('beforeend', this.loader);
  }

  clearLoader() {
    if (this.loader) this.loader.remove();
  }

  insertError(message) {
    if (!this.errorElement) this.errorElement = document.createElement('p');
    this.errorElement.classList.add('error');
    this.errorElement.textContent = message;
    this.forgotPasswordForm.insertAdjacentElement(
      'beforeend',
      this.errorElement
    );
  }

  addSearchButtonHandler(handler) {
    this.forgotPasswordContainer
      .querySelector('.btn--forgot-password')
      .addEventListener('click', this.searchButtonHandler.bind(this, handler));
  }

  searchButtonHandler(handler, e) {
    e.preventDefault();
    const username = this.forgotPasswordFormInput.value.trim();
    handler(username);
  }

  clearInput() {
    this.forgotPasswordFormInput.value = '';
  }

  showForgetPasswordFormMessage(message) {
    this.forgotPasswordForm.classList.add('hidden');
    this.forgotPasswordMessageContainer.classList.remove('hidden');
    this.forgotPasswordMessage.textContent = message;
  }
}

export default new ForgotPasswordView();
