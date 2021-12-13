/*eslint-disable*/
class SidebarView {
  constructor() {
    this.sidebar = document.querySelector('.sidebar');
    this.searchbarIcon = document.querySelector('.searchbar__icon');
    this.searchbarInput = document.querySelector('.searchbar__input');
  }

  addSearchbarIconClickListener(handler) {
    this.searchbarIcon.addEventListener(
      'click',
      this.searchbarIconClickHandler.bind(this, handler)
    );
  }

  searchbarIconClickHandler(handler) {
    const query = this.searchbarInput.value.trim();
    handler(query);
  }

  clearSearchBarInput() {
    this.searchbarInput.value = '';
  }
}

export default new SidebarView();
