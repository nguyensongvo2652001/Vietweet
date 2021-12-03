/*eslint-disable*/

class Navbar {
  constructor() {
    this.parentElement = document.querySelector('.nav');
    this.homeItem = this.parentElement.querySelector('.nav__home');
    this.profileItem = this.parentElement.querySelector('.nav__profile');
    this.logoutButton = this.parentElement.querySelector('.btn--logout');
  }

  setNavItemInactive(item) {
    item.classList.remove('nav__item--active');
    const itemIcon = item.querySelector('.nav__item__icon');
    itemIcon.name = `${itemIcon.name}-outline`;
  }

  setNavItemActive(item) {
    item.classList.add('nav__item--active');
    const itemIcon = item.querySelector('.nav__item__icon');
    itemIcon.name = `${itemIcon.name.split('-')[0]}`;
  }

  addHomeClickListener(handler) {
    this.homeItem.addEventListener('click', handler);
  }

  addProfileClickListener(handler) {
    this.profileItem.addEventListener('click', handler);
  }

  addLogoutClickListener(handler) {
    this.logoutButton.addEventListener('click', handler);
  }
}

export default new Navbar();
