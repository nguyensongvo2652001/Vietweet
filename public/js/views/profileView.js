/*eslint-disable*/
class ProfileView {
  constructor() {
    this.profile = document.querySelector('.profile');
    this.profileTabs = document.querySelectorAll('.profile__tab');
    this.ownTweets = document.querySelector('.own-tweets');
    this.likedTweets = document.querySelector('.liked-tweets');
    this.profileFollowItems = document.querySelectorAll(
      '.profile__follow-info-item'
    );
    this.editProfileButton = document.querySelector('.btn--edit-profile');
    this.editProfileForm = document.querySelector('.edit-profile-container');
    this.addClickTabsListener();
    this.addEditProfileButtonClickListener();

    this.profileBackgroundEl = document.querySelector('.profile__background');
    this.profileAvatarEl = document.querySelector('.profile__avatar');
    this.profileNameEl = document.querySelector('.profile__name');
    this.profileUsernameEl = document.querySelector('.profile__username');
    this.profileMetadata = document.querySelector('.profile__metadata');
    this.findBioEl();
    this.findLocationEl();
    this.findWebsiteEl();
  }

  findBioEl() {
    this.profileBioEl = document.querySelector('.profile__bio');
  }

  findLocationEl() {
    this.profileLocationEl = document.querySelector('.profile__location');
  }

  findWebsiteEl() {
    this.profileWebsiteEl = document.querySelector('.profile__website');
  }

  getProfileBioHTML(bio) {
    return `<p class = 'profile__bio'> ${bio} </p>`;
  }

  getLocationHTML(location) {
    return `
    <li class = 'profile__metadata-item proflile__location-container'>
      <ion-icon name="location-outline"></ion-icon>
      <p class = 'profile__location'>${location}</p>
    </li>`;
  }

  getWebsiteHTML(website) {
    return `
    <li class = 'profile__metadata-item proflile__website-container'>
      <ion-icon name="link-outline"></ion-icon>
      <a class = 'profile__website' href = ${website}>${website}</a>
    </li>`;
  }

  insertBioEl(bio) {
    if (this.profileBioEl) return (this.profileBioEl.textContent = bio);
    this.profileUsernameEl.insertAdjacentHTML(
      'afterend',
      this.getProfileBioHTML(bio)
    );
    this.findBioEl();
  }

  insertLocationEl(location) {
    if (this.profileLocationEl)
      return (this.profileLocationEl.textContent = location);
    this.profileMetadata.insertAdjacentHTML(
      'afterbegin',
      this.getLocationHTML(location)
    );
    this.findLocationEl();
  }

  insertWebsiteEl(website) {
    if (this.profileWebsiteEl)
      return (this.profileWebsiteEl.textContent = website);

    const html = this.getWebsiteHTML(website);

    if (this.profileLocationEl)
      return this.profileLocationEl.insertAdjacentHTML('afterend', html);

    this.profileMetadata.insertAdjacentHTML('afterbegin', html);
    this.findWebsiteEl();
  }

  addEditProfileButtonClickListener() {
    if (!this.editProfileButton) return;
    this.editProfileButton.addEventListener(
      'click',
      this.editProfileButtonClickHandler.bind(this)
    );
  }

  addProfileFollowItemsClickListener(handler) {
    const { username } = this.profile.dataset;

    this.profileFollowItems.forEach(item => {
      const following = item.classList.contains('profile__followings-info');
      item.addEventListener('click', handler.bind(null, username, following));
    });
  }

  addClickTabsListener() {
    this.profileTabs.forEach(this.addClickTabListener.bind(this));
  }

  addClickTabListener(tab) {
    tab.addEventListener('click', this.clickTabHandler.bind(this, tab));
  }

  clickTabHandler(tab) {
    this.profileTabs.forEach(tab =>
      tab.classList.remove('profile__tab--active')
    );
    tab.classList.add('profile__tab--active');
    if (tab.classList.contains('profile__tweets-tab'))
      return this.showOwnTweets();
    this.showLikedTweets();
  }

  showOwnTweets() {
    this.likedTweets.classList.add('hidden');
    this.ownTweets.classList.remove('hidden');
  }
  showLikedTweets() {
    this.likedTweets.classList.remove('hidden');
    this.ownTweets.classList.add('hidden');
  }

  editProfileButtonClickHandler() {
    this.editProfileForm.classList.remove('hidden');
  }

  updateProfileUI(user) {
    console.log(user);
    this.profileBackgroundEl.src = `/img/users/backgrounds/${
      user.background
    }?${new Date().getTime()}`; //We have to add new Date().getTime() to force the image element to reload if it is the same url (this is just a hack)
    this.profileAvatarEl.src = `/img/users/avatars/${
      user.avatar
    }?${new Date().getTime()}`;
    this.profileNameEl.textContent = user.name;
    this.profileUsernameEl.textContent = user.username;
    if (user.bio) this.insertBioEl(user.bio);
    if (user.website) this.insertWebsiteEl(user.website);
    if (user.location) this.insertLocationEl(user.location);
  }
}

export default new ProfileView();
