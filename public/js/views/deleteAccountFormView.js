/*eslint-disable*/
class DeleteAccountFormView {
  constructor() {
    this.deleteAccountContainer = document.querySelector(
      '.confirm-delete-container'
    );

    this.deleteAccountForm = document.querySelector('.confirm-delete__form');

    this.deleteAccountFormBackdrop = this.deleteAccountContainer.querySelector(
      '.confirm-delete-backdrop'
    );

    this.cancelButton = this.deleteAccountContainer.querySelector(
      '.btn--cancel'
    );

    this.confirmDeleteButton = this.deleteAccountContainer.querySelector(
      '.btn--delete-account'
    );

    this.passwordInput = this.deleteAccountContainer.querySelector(
      '.password-input'
    );

    this.addListeners();
  }

  addListeners() {
    this.addCancelButtonClickListener();
    this.addDeleteAccountBackdropClickListener();
  }

  closeForm() {
    this.deleteAccountContainer.classList.add('hidden');
  }

  addCancelButtonClickListener() {
    this.cancelButton.addEventListener('click', this.closeForm.bind(this));
  }

  addDeleteAccountBackdropClickListener() {
    this.deleteAccountFormBackdrop.addEventListener(
      'click',
      this.closeForm.bind(this)
    );
  }

  addDeleteAccountFormSubmitListener(handler) {
    this.confirmDeleteButton.addEventListener(
      'click',
      this.deleteAccountFormSubmitHandler.bind(this, handler)
    );
  }

  deleteAccountFormSubmitHandler(handler, e) {
    e.preventDefault();
    const password = this.passwordInput.value.trim();
    handler(password);
  }

  insertError(errorMessage) {
    if (!this.errorEl) this.errorEl = document.createElement('p');
    this.errorEl.classList.add('error');
    this.errorEl.textContent = errorMessage;
    this.deleteAccountForm.insertAdjacentElement('beforeend', this.errorEl);
  }
}

export default new DeleteAccountFormView();
