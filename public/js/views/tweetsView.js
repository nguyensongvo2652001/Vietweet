/*eslint-disable*/
class TweetsView {
  constructor() {
    this.tweets = document.querySelectorAll('.tweet-container');
  }

  findAllTweets() {
    this.tweets = document.querySelectorAll('.tweet-container');
  }

  setTweetsAvatarClickListeners() {
    if (!this.tweets) return;
    this.tweets.forEach(this.setTweetAvatarClickListener.bind(this));
  }

  setTweetsNameClickListeners() {
    if (!this.tweets) return;
    this.tweets.forEach(this.setTweetNameClickListener.bind(this));
  }

  setTweetsClickListeners(e) {
    if (!this.tweets) return;
    this.tweets.forEach(this.setTweetClickListener.bind(this));
  }

  setTweetClickListener(tweet) {
    tweet.addEventListener('click', this.tweetClickHandler.bind(this, tweet));
  }

  setTweetAvatarClickListener(tweet) {
    const avatar = tweet.querySelector('.tweet__avatar');

    avatar.addEventListener(
      'click',
      this.goToProfile.bind(this, tweet.dataset.username)
    );
  }

  setTweetNameClickListener(tweet) {
    const name = tweet.querySelector('.tweet__name');
    name.addEventListener(
      'click',
      this.goToProfile.bind(this, tweet.dataset.username)
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

  goToProfile(username) {
    console.log(username);
  }

  goToTweetDetail(id) {
    console.log(id);
  }
}

export default new TweetsView();
