/*eslint-disable*/
class TweetsView {
  constructor() {
    this.tweets = document.querySelectorAll('.tweet-container');
  }

  findAllTweets() {
    this.tweets = document.querySelectorAll('.tweet-container');
  }

  setTweetsLikeIconClickListeners(handler) {
    if (!this.tweets) return;
    this.tweets.forEach(this.setTweetLikeIconClickListener.bind(this, handler));
  }

  setTweetsDislikeIconClickListeners(handler) {
    if (!this.tweets) return;
    this.tweets.forEach(
      this.setTweetDislikeIconClickListener.bind(this, handler)
    );
  }

  setTweetsAvatarClickListeners(handler) {
    if (!this.tweets) return;
    this.tweets.forEach(this.setTweetAvatarClickListener.bind(this, handler));
  }

  setTweetsNameClickListeners(handler) {
    if (!this.tweets) return;
    this.tweets.forEach(this.setTweetNameClickListener.bind(this, handler));
  }

  setTweetsClickListeners(e) {
    if (!this.tweets) return;
    this.tweets.forEach(this.setTweetClickListener.bind(this));
  }

  setTweetClickListener(tweet) {
    tweet.addEventListener('click', this.tweetClickHandler.bind(this, tweet));
  }

  setTweetAvatarClickListener(handler, tweet) {
    const avatar = tweet.querySelector('.tweet__avatar');

    avatar.addEventListener(
      'click',
      handler.bind(null, tweet.dataset.username)
    );
  }

  setTweetNameClickListener(handler, tweet) {
    const name = tweet.querySelector('.tweet__name');
    name.addEventListener('click', handler.bind(null, tweet.dataset.username));
  }

  setTweetLikeIconClickListener(handler, tweet) {
    const likeContainer = tweet.querySelector('.like-container');
    const { tweetId } = tweet.dataset;
    const { likeId } = likeContainer.dataset;
    likeContainer.addEventListener(
      'click',
      handler.bind(null, likeContainer, tweetId)
    );
  }

  tweetClickHandler(tweet, e) {
    if (
      !e.target.classList.contains('tweet__container') &&
      !e.target.classList.contains('tweet')
    )
      return;
    this.goToTweetDetail(tweet.dataset.tweetId);
  }

  updateLikeContainerUI(likeContainer, likeId) {
    likeContainer.classList.toggle('tweet__data-container--liked');
    const icon = likeContainer.querySelector('.tweet__data__icon');

    //Update icon
    if (icon.name === 'heart') icon.name = 'heart-outline';
    else icon.name = 'heart';

    //Update count
    const increase = likeId ? 1 : -1;
    const likeNumberEl = likeContainer.querySelector('.tweet__data__number');
    likeNumberEl.textContent = Number(likeNumberEl.textContent) + increase;

    //Update likeId
    likeContainer.dataset.likeId = likeId;
  }

  goToProfile(username) {
    console.log(username);
  }

  goToTweetDetail(id) {
    console.log(id);
  }
}

export default new TweetsView();
