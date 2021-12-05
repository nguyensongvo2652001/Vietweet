/*eslint-disable*/

class TweetView {
  getTweetHTML(tweet) {
    const imageEl = tweet.image
      ? `<img alt = 'Tweet image' src = '/img/tweets/${tweet.image}' class = 'tweet__image'/>`
      : '';
    return `
    <div class="tweet-container" data-username='${
      tweet.user.username
    }' data-tweet-id = '${tweet._id}'>
    <div class="tweet">
      <div class="tweet__avatar-container">
        <img
          class="avatar--small tweet__avatar"
          src = "/img/users/avatars/${tweet.user.avatar}"
          alt="User avatar"
        />
      </div>
        <div class="tweet__info">
          <div class="tweet__userdata">
            <div class = "tweet__userdisplay">
              <p class="name tweet__name">${tweet.user.name}</p>
              <p class="username ">@${tweet.user.username}</p>
            </div>
            <p class="tweet__date">${new Date(
              tweet.dateTweeted
            ).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>
          <p class="tweet__content">
            ${tweet.content}
          </p>
          ${imageEl}
          <div class="tweet__metadata">
            <div class="tweet__data-container">
              <ion-icon
                name="chatbox-outline"
                class="tweet__data__icon"
              ></ion-icon>
              <p class="tweet__data__number">3</p>
            </div>

            <div class="tweet__data-container">
              <ion-icon
                name="heart-outline"
                class="tweet__data__icon"
              ></ion-icon>
              <p class="tweet__data__number">3</p>
            </div>
          </div>
        </div>
      </div>
  </div>`;
  }

  getReplyHTML(reply) {
    console.log(reply);
    const imageEl = reply.image
      ? `<img alt = 'Reply image' src = '/img/replies/${reply.image}' class = 'reply__image'/>`
      : '';
    return `
  <div class="tweet-container tweet--reply" data-username='${
    reply.user.username
  }'>
  <div class="tweet tweet--reply">
    <div class="tweet__avatar-container">
      <img
        class="avatar--small tweet__avatar"
        src = '/img/users/avatars/${reply.user.avatar}'
        alt="User avatar"
      />
    </div>
      <div class="tweet__info">
        <div class="tweet__userdata">
          <div class = "tweet__userdisplay">
            <p class="name tweet__name">${reply.user.name}</p>
            <p class="username ">@${reply.user.username}</p>
          </div>
          <p class="tweet__date">${new Date(
            reply.dateReplied
          ).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
        </div>
        <p class="tweet__content">
          ${reply.content}
        </p>
        ${imageEl}`;
  }
}

export default new TweetView();
