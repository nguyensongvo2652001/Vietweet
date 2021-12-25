/*eslint-disable*/

class FollowButtonView {
  constructor() {
    this.followButton = document.querySelector('.profile__follow-btn');
    this.profile = document.querySelector('.profile');
    this.profileFollowersCount = this.profile.querySelector(
      '.profile__followers-number'
    );
    this.addUnfollowButtonHoverEffect();
    this.addUnfollowButtonMouseOutEffect();
  }

  addUnfollowButtonHoverEffect() {
    if (!this.followButton) return;
    this.followButton.addEventListener(
      'mouseover',
      this.unfollowButtonHoverHandler.bind(this)
    );
  }

  addUnfollowButtonMouseOutEffect() {
    if (!this.followButton) return;
    this.followButton.addEventListener(
      'mouseout',
      this.unfollowButtonMouseOutHandler.bind(this)
    );
  }

  addFollowButtonClickHandler(handler) {
    if (!this.followButton) return;
    this.followButton.addEventListener(
      'click',
      this.followButtonHandler.bind(this, handler)
    );
  }

  unfollowButtonHoverHandler() {
    if (!this.followButton) return;
    if (!this.followButton.classList.contains('btn--unfollow')) return;
    this.followButton.textContent = 'Unfollow';
    this.followButton.classList.add('btn--unfollow--hover');
  }

  unfollowButtonMouseOutHandler() {
    if (!this.followButton) return;
    if (!this.followButton.classList.contains('btn--unfollow')) return;
    this.followButton.textContent = 'Following';
    this.followButton.classList.remove('btn--unfollow--hover');
  }

  followButtonHandler(handler) {
    if (!this.followButton) return;
    if (this.followButton.classList.contains('btn--follow'))
      handler(false, { following: this.profile.dataset.userId });
    else handler(true, { followId: this.followButton.dataset.followId });
  }

  updateFollowButtonUI() {
    if (this.followButton.classList.contains('btn--follow')) {
      this.followButton.classList.remove('btn--follow');
      this.followButton.classList.add('btn--unfollow');
      this.followButton.textContent = 'Following';
      return;
    }

    this.followButton.classList.add('btn--follow');
    this.followButton.classList.remove('btn--unfollow');
    this.followButton.textContent = 'Follow';
    this.followButton.classList.remove('btn--unfollow--hover'); //This is just to make sure that we are not in the hover state
  }

  updateFollowersCount(number) {
    this.profileFollowersCount.textContent =
      Number(this.profileFollowersCount.textContent) + number;
  }

  addFollowIdToFollowButton(followId) {
    this.followButton.dataset.followId = followId;
  }

  toggleDisableButton() {
    this.followButton.disabled = !this.followButton.disabled;
  }
}

export default new FollowButtonView();
