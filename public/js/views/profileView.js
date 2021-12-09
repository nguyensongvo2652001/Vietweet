/*eslint-disable*/
class ProfileView {
  constructor() {
    this.profile = document.querySelector('.profile');
    this.profileTabs = document.querySelectorAll('.profile__tab');
    this.ownTweets = document.querySelector('.own-tweets');
    this.likedTweets = document.querySelector('.liked-tweets');
    this.addClickTabsListener();
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
}

export default new ProfileView();
