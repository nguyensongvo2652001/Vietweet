/*eslint-disable*/
class PeopleView {
  constructor() {
    this.people = document.querySelectorAll('.people-container');
  }

  findAllPeople() {
    this.people = document.querySelectorAll('.people-container');
  }

  setPeopleAvatarClickListeners(handler) {
    if (!this.people) return;
    this.people.forEach(this.setPeopleAvatarClickListener.bind(this, handler));
  }

  setPeopleNameClickListeners(handler) {
    if (!this.people) return;
    this.people.forEach(this.setPeopleNameClickListener.bind(this, handler));
  }

  setPeopleClickListeners(handler) {
    if (!this.people) return;
    this.people.forEach(this.setPeopleClickListener.bind(this, handler));
  }

  setPeopleClickListener(handler, people) {
    people.addEventListener(
      'click',
      this.peopleClickHandler.bind(this, handler, people)
    );
  }

  setPeopleAvatarClickListener(handler, people) {
    const avatar = people.querySelector('.people__avatar');

    avatar.addEventListener(
      'click',
      handler.bind(null, people.dataset.username)
    );
  }

  setPeopleNameClickListener(handler, people) {
    const name = people.querySelector('.people__name');
    name.addEventListener('click', handler.bind(null, people.dataset.username));
  }

  peopleClickHandler(handler, people, e) {
    if (!e.target.classList.contains('people-container')) return;

    handler(people.dataset.username);
  }
}

export default new PeopleView();
