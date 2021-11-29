/*eslint-disable*/

class TweetCreateView {
  constructor() {
    this.parentElement = document.querySelector('.main__tweet-form');
    this.textInput = this.parentElement.querySelector(
      '.main__tweet-form__input'
    );
    this.imageInput = this.parentElement.querySelector('.image-input');
    this.tweetButton = this.parentElement.querySelector('.btn--tweet');
    this.liveImageEl = undefined;
  }

  setImageInputLivePreview() {
    this.imageInput.addEventListener(
      'change',
      this.imageInputLivePreviewHandler.bind(this)
    );
  }

  imageInputLivePreviewHandler() {
    const imageUrl = URL.createObjectURL(this.imageInput.files[0]);
    this.createLiveImageElement(imageUrl);
  }

  createLiveImageElement(imageSrc) {
    if (this.liveImageEl) return (this.liveImageEl.src = imageSrc);
    this.liveImageEl = document.createElement('img');
    this.liveImageEl.classList.add('tweet__image');
    this.liveImageEl.src = imageSrc;
    this.textInput.insertAdjacentElement('afterend', this.liveImageEl);
  }

  addOnSubmitHandler(handler) {
    this.tweetButton.addEventListener(
      'click',
      this.submitHandler.bind(this, handler)
    );
  }

  submitHandler(handler, event) {
    event.preventDefault();

    const content = this.textInput.value;
    let image;
    if (this.imageInput.files) image = this.imageInput.files[0];

    handler(content, image);
  }
}

export default new TweetCreateView();
