/*eslint-disable*/
class TweetsView {
  constructor() {
    this.tweets = document.querySelectorAll('.tweet-container');
  }

  findAllTweets() {
    this.tweets = document.querySelectorAll('.tweet-container');
  }

  setTweetsReplyIconClickListeners(handler) {
    if (!this.tweets) return;
    this.tweets.forEach(
      this.setTweetReplyIconClickListener.bind(this, handler)
    );
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

  setTweetsClickListeners(handler) {
    if (!this.tweets) return;
    this.tweets.forEach(this.setTweetClickListener.bind(this, handler));
  }

  setTweetClickListener(handler, tweet) {
    tweet.addEventListener(
      'click',
      this.tweetClickHandler.bind(this, handler, tweet)
    );
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
    if (!likeContainer) return;
    const { tweetId } = tweet.dataset;
    const { likeId } = likeContainer.dataset;
    likeContainer.addEventListener(
      'click',
      handler.bind(null, likeContainer, tweetId)
    );
  }

  setTweetReplyIconClickListener(handler, tweet) {
    const replyContainer = tweet.querySelector('.tweet__data-reply-container');
    if (!replyContainer) return;
    const { tweetId } = tweet.dataset;
    replyContainer.addEventListener('click', handler.bind(null, tweetId));
  }

  tweetClickHandler(handler, tweet, e) {
    if (e.target.classList.contains('tweet__avatar')) return;
    if (e.target.classList.contains('tweet__name')) return;
    if (e.target.closest('.tweet--reply')) return;
    if (e.target.classList.contains('like-container')) return;
    if (e.target.classList.contains('tweet__data-reply-container')) return;
    if (e.target.classList.contains('tweet__data__icon')) return;

    handler(tweet.dataset.tweetId);
  }

  updateLikeContainerUI(likeContainer, increase) {
    likeContainer.classList.toggle('tweet__data-container--liked');
    const icon = likeContainer.querySelector('.tweet__data__icon');

    //Update icon
    if (icon.name === 'heart') icon.name = 'heart-outline';
    else icon.name = 'heart';

    //Update count
    const likeNumberEl = likeContainer.querySelector('.tweet__data__number');
    likeNumberEl.textContent = Number(likeNumberEl.textContent) + increase;
  }

  setLikeContainerLikeId(likeContainer, likeId) {
    //Update likeId
    likeContainer.dataset.likeId = likeId;
  }

  toggleDisabledLikeContainer(likeContainer) {
    likeContainer.disabled = !likeContainer.disabled;
  }

  updateTweetsUI(user) {
    this.tweets.forEach(tweet => this.updateTweetUI(tweet, user));
  }

  updateTweetUI(tweetEl, user) {
    const tweetUserNameEl = tweetEl.querySelector('.tweet__name');
    const tweetUserAvatarEl = tweetEl.querySelector('.tweet__avatar');

    tweetUserAvatarEl.src = `/img/users/avatars/${
      user.avatar
    }?${new Date().getTime()}`; //new Date().getTime() is just a hack to force image to reload even if the source is not different
    tweetUserNameEl.textContent = user.name;
  }
}

export default new TweetsView();
