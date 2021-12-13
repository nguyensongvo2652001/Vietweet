/*eslint-disable*/
class SearchResultView {
  constructor() {
    this.searchTabs = document.querySelectorAll('.search__tab');
    this.usersList = document.querySelector('.people-list');
    this.tweetsList = document.querySelector('.tweets');
    this.addClickTabsListener();
  }

  addClickTabsListener() {
    this.searchTabs.forEach(this.addClickTabListener.bind(this));
  }

  addClickTabListener(tab) {
    tab.addEventListener('click', this.clickTabHandler.bind(this, tab));
  }

  clickTabHandler(tab) {
    this.searchTabs.forEach(tab => tab.classList.remove('search__tab--active'));
    tab.classList.add('search__tab--active');
    if (tab.classList.contains('search__tweets-tab')) return this.showTweets();
    this.showUsers();
  }

  showTweets() {
    this.usersList.classList.add('hidden');
    this.tweetsList.classList.remove('hidden');
  }
  showUsers() {
    this.usersList.classList.remove('hidden');
    this.tweetsList.classList.add('hidden');
  }
}

export default new SearchResultView();
