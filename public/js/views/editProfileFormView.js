/*eslint-disable*/
class EditProfileFormView {
  constructor() {
    this.editProfileForm = document.querySelector('.edit-profile-container');
    this.deleteAccountForm = document.querySelector(
      '.confirm-delete-container'
    );

    this.editProfileBackdrop = this.editProfileForm.querySelector(
      '.edit-profile__backdrop'
    );
    this.editProfileModal = document.querySelector('.edit-profile');
    this.closeButton = this.editProfileForm.querySelector(
      '.edit-profile__close'
    );
    this.editProfileBackgroundInput = this.editProfileForm.querySelector(
      '.edit-profile__background-input'
    );
    this.editProfileBackgroundImage = this.editProfileForm.querySelector(
      '.edit-profile__background'
    );
    this.editProfileAvatarInput = this.editProfileForm.querySelector(
      '.edit-profile__avatar-input'
    );
    this.editProfileAvatarImage = this.editProfileForm.querySelector(
      '.edit-profile__avatar'
    );

    this.saveButton = this.editProfileForm.querySelector('.btn--save-profile');
    this.deleteAccountButton = this.editProfileForm.querySelector(
      '.edit-profile__delete-account-btn'
    );

    this.nameInput = this.editProfileForm.querySelector('.name-input');
    this.bioInput = this.editProfileForm.querySelector('.bio-input');
    this.locationInput = this.editProfileForm.querySelector('.location-input');
    this.websiteInput = this.editProfileForm.querySelector('.website-input');

    this.addListeners();
  }

  addListeners() {
    this.addCloseButtonClickListener();
    this.addEditProfileBackdropClickListener();
    this.addBackgroundInputChangeHandler();
    this.addAvatarInputChangeHandler();
    this.addDeleteAccountButtonClickListener();
  }

  closeForm() {
    this.editProfileForm.classList.add('hidden');
  }

  addDeleteAccountButtonClickListener() {
    console.log(this.deleteAccountForm);
    console.log(this.deleteAccountButton);
    this.deleteAccountButton.addEventListener(
      'click',
      this.showDeleteAccountForm.bind(this)
    );
  }

  addEditProfileBackdropClickListener() {
    if (!this.editProfileBackdrop) return;
    this.editProfileBackdrop.addEventListener(
      'click',
      this.closeForm.bind(this)
    );
  }

  addCloseButtonClickListener() {
    if (!this.closeButton) return;
    this.closeButton.addEventListener('click', this.closeForm.bind(this));
  }

  addBackgroundInputChangeHandler() {
    this.editProfileBackgroundInput.addEventListener(
      'change',
      this.imageInputLivePreviewHandler.bind(
        this,
        this.editProfileBackgroundInput,
        this.editProfileBackgroundImage
      )
    );
  }

  addAvatarInputChangeHandler() {
    this.editProfileAvatarInput.addEventListener(
      'change',
      this.imageInputLivePreviewHandler.bind(
        this,
        this.editProfileAvatarInput,
        this.editProfileAvatarImage
      )
    );
  }

  imageInputLivePreviewHandler(input, imageEl) {
    const imageSrc = URL.createObjectURL(input.files[0]);
    this.setImage(imageEl, imageSrc);
  }

  setImage(element, imageSrc) {
    element.src = imageSrc;
  }

  addSaveButtonClickHandler(handler) {
    this.saveButton.addEventListener(
      'click',
      this.saveButtonClickHandler.bind(this, handler)
    );
  }

  saveButtonClickHandler(handler) {
    const name = this.nameInput.value.trim();
    const bio = this.bioInput.value.trim();
    const location = this.locationInput.value.trim();
    const website = this.websiteInput.value.trim();

    const data = {};
    if (name) data.name = name;
    if (bio) data.bio = bio;
    if (location) data.location = location;
    if (website) data.website = website;
    if (this.editProfileAvatarInput.files.length > 0)
      data.avatar = this.editProfileAvatarInput.files[0];
    if (this.editProfileBackgroundInput.files.length > 0)
      data.background = this.editProfileBackgroundInput.files[0];

    handler(data);
  }

  insertErrorToEditProfileForm(errorMessage) {
    if (!this.editProfileErrorEl)
      this.editProfileErrorEl = document.createElement('p');
    this.editProfileErrorEl.classList.add('error');
    this.editProfileErrorEl.textContent = errorMessage;
    this.editProfileModal.insertAdjacentElement(
      'beforeend',
      this.editProfileErrorEl
    );
  }

  showDeleteAccountForm() {
    this.deleteAccountForm.classList.remove('hidden');
  }
}

export default new EditProfileFormView();
