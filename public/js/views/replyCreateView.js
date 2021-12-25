/*eslint-disable*/
import { TweetCreateView } from './tweetCreateView.js';

class ReplyCreateView extends TweetCreateView {
  constructor() {
    super();
    this.parentElement = document.querySelector('.reply-form-container');
    this.textInput = this.parentElement.querySelector('.reply__text-input');
    this.imageInput = this.parentElement.querySelector('.reply__image-input');
    this.tweetButton = this.parentElement.querySelector('.btn--tweet');
    this.tweets = document.querySelector('.tweets');
    this.replyNumberEl = document.querySelector('.reply__replies-number');
    this.liveImageEl = undefined;
  }

  createLiveImageElement(imageSrc) {
    this.liveImageEl = document.createElement('img');
    this.liveImageEl.classList.add('reply__image');
    this.liveImageEl.src = imageSrc;
    this.textInput.insertAdjacentElement('afterend', this.liveImageEl);
  }

  submitHandler(handler, event) {
    event.preventDefault();

    const content = this.textInput.value;
    const tweet = this.parentElement.dataset.tweetId;
    let image;
    if (this.imageInput.files) image = this.imageInput.files[0];

    handler(content, image, tweet);
  }

  updateRepliesNumber() {
    this.replyNumberEl.textContent = Number(this.replyNumberEl.textContent) + 1;
  }
}

export default new ReplyCreateView();
