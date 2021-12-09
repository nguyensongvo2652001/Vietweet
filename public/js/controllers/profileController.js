/*eslint-disable*/
import profileView from '../views/profileView.js';
import { redirect } from '../helper.js';

const goToFollowList = (username, following) => {
  redirect(`/profile/${username}/follow?following=${following}`);
};

const init = () => {
  profileView.addProfileFollowItemsClickListener(goToFollowList);
};

init();
