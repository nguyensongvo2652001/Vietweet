/*eslint-disable*/

export class TweetCreateView {
  constructor() {
    this.parentElement = document.querySelector('.main__tweet-form');
    if (this.parentElement) this.findElements();
  }

  findElements() {
    this.textInput = this.parentElement.querySelector(
      '.main__tweet-form__input'
    );
    this.imageInput = this.parentElement.querySelector('.image-input');
    this.tweetButton = this.parentElement.querySelector('.btn--tweet');
    this.tweets = document.querySelector('.tweets');
    this.liveImageEl = undefined;
  }

  clear() {
    this.textInput.value = '';
    this.tweetButton.disabled = true;
    this.imageInput.files = new DataTransfer().files; //This is to clear all the old uploaded images.
    if (this.liveImageEl) {
      this.liveImageEl.remove();
    }
  }

  setTweetContentOnChange() {
    this.textInput.addEventListener(
      'input',
      this.tweetTextChangeHandler.bind(this)
    );
  }

  setImageInputLivePreview() {
    this.imageInput.addEventListener(
      'change',
      this.imageInputLivePreviewHandler.bind(this)
    );
  }

  setTweetFormAvatarClickHandler(handler) {
    const tweetAvatar = this.parentElement.querySelector('.avatar--small');
    tweetAvatar.addEventListener('click', handler);
  }

  imageInputLivePreviewHandler() {
    const imageUrl = URL.createObjectURL(this.imageInput.files[0]);
    this.createLiveImageElement(imageUrl);
  }

  createLiveImageElement(imageSrc) {
    if (!this.liveImageEl) {
      this.liveImageEl = document.createElement('img');
      this.liveImageEl.classList.add('tweet__image');
      this.textInput.insertAdjacentElement('afterend', this.liveImageEl);
    }
    this.liveImageEl.src = imageSrc;
  }

  addOnSubmitHandler(handler) {
    this.tweetButton.addEventListener(
      'click',
      this.submitHandler.bind(this, handler)
    );
  }

  tweetTextChangeHandler() {
    const content = this.textInput.value.trim();
    if (content.length === 0 || content.length > 200)
      return (this.tweetButton.disabled = true);
    this.tweetButton.disabled = false;
  }

  submitHandler(handler, event) {
    event.preventDefault();

    const content = this.textInput.value;
    let image;
    if (this.imageInput.files.length > 0) image = this.imageInput.files[0];

    handler(content, image);
  }

  insertTweetToTweets(tweetHTML) {
    this.tweets.insertAdjacentHTML('afterbegin', tweetHTML);
  }
}

export default new TweetCreateView();
