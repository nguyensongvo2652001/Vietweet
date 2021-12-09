/*eslint-disable*/
class FollowListView {
  constructor() {
    this.followListTabs = document.querySelectorAll('.follow__tab');
    this.followingsList = document.querySelector('.followings-list');
    this.followersList = document.querySelector('.followers-list');
    this.addClickTabsListener();
  }

  addClickTabsListener() {
    this.followListTabs.forEach(this.addClickTabListener.bind(this));
  }

  addClickTabListener(tab) {
    tab.addEventListener('click', this.clickTabHandler.bind(this, tab));
  }

  clickTabHandler(tab) {
    this.followListTabs.forEach(tab =>
      tab.classList.remove('follow__tab--active')
    );
    tab.classList.add('follow__tab--active');
    if (tab.classList.contains('follow__followers-tab'))
      return this.showFollowers();
    this.showFollowings();
  }

  showFollowings() {
    this.followersList.classList.add('hidden');
    this.followingsList.classList.remove('hidden');
  }
  showFollowers() {
    this.followersList.classList.remove('hidden');
    this.followingsList.classList.add('hidden');
  }
}

export default new FollowListView();
