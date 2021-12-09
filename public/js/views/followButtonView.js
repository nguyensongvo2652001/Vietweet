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
    this.followButton.addEventListener(
      'mouseover',
      this.unfollowButtonHoverHandler.bind(this)
    );
  }

  addUnfollowButtonMouseOutEffect() {
    this.followButton.addEventListener(
      'mouseout',
      this.unfollowButtonMouseOutHandler.bind(this)
    );
  }

  addFollowButtonClickHandler(handler) {
    this.followButton.addEventListener(
      'click',
      this.followButtonHandler.bind(this, handler)
    );
  }

  unfollowButtonHoverHandler() {
    if (!this.followButton.classList.contains('btn--unfollow')) return;
    this.followButton.textContent = 'Unfollow';
    this.followButton.style.color = '#e03131';
    this.followButton.style.borderColor = '#e03131';
  }

  unfollowButtonMouseOutHandler() {
    if (!this.followButton.classList.contains('btn--unfollow')) return;
    this.followButton.textContent = 'Following';
    this.followButton.style.color = '#1da1f2';
    this.followButton.style.borderColor = '#1da1f2';
  }

  followButtonHandler(handler) {
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
    this.followButton.style.color = '#fff';
    this.followButton.textContent = 'Follow';
  }

  updateFollowersCount(number) {
    this.profileFollowersCount.textContent =
      Number(this.profileFollowersCount.textContent) + number;
  }

  addFollowIdToFollowButton(followId) {
    this.followButton.dataset.followId = followId;
  }
}

export default new FollowButtonView();
