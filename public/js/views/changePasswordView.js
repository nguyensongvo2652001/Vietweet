/*eslint-disable*/
class ChangePasswordView {
  constructor() {
    this.changePasswordButton = document.querySelector(
      '.profile__btn--change-password '
    );
    this.changePasswordForm = document.querySelector(
      '.change-password-container'
    );
    this.errorElement = null;
  }

  addChangePasswordButtonClickHandler() {
    if (!this.changePasswordButton) return;
    this.changePasswordButton.addEventListener(
      'click',
      this.changePasswordButtonClickHandler.bind(this)
    );
  }

  addChangePasswordFormCancelClickHandler() {
    this.changePasswordForm
      .querySelector('.btn--cancel')
      .addEventListener('click', this.closeChangePasswordForm.bind(this));
  }

  addChangePasswordFormBackdropClickHandler() {
    this.changePasswordForm
      .querySelector('.backdrop')
      .addEventListener('click', this.closeChangePasswordForm.bind(this));
  }

  addChangePasswordFormSubmitClickHandler(handler) {
    this.changePasswordForm
      .querySelector('.btn--submit')
      .addEventListener(
        'click',
        this.changePasswordFormSubmitClickHandler.bind(this, handler)
      );
  }

  changePasswordFormSubmitClickHandler(handler, e) {
    e.preventDefault();
    const currentPassword = this.changePasswordForm
      .querySelector('.change-password__form-input--currentPassword')
      .value.trim();
    const newPassword = this.changePasswordForm
      .querySelector('.change-password__form-input--newPassword')
      .value.trim();
    handler(currentPassword, newPassword);
  }

  changePasswordButtonClickHandler() {
    this.changePasswordForm.classList.remove('hidden');
  }

  closeChangePasswordForm() {
    this.changePasswordForm.classList.add('hidden');
  }

  insertError(errorMessage) {
    if (!this.errorElement) this.errorElement = document.createElement('p');
    this.errorElement.textContent = errorMessage;
    this.errorElement.classList.add('error');
    this.changePasswordForm
      .querySelector('.change-password__form')
      .insertAdjacentElement('beforeend', this.errorElement);
  }
}

export default new ChangePasswordView();
