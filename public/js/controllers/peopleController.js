/*eslint-disable*/
import peopleView from '../views/peopleView.js';
import { redirect } from '../helper.js';

const goToProfile = username => {
  redirect(`/profile/${username}`);
};

const init = () => {
  peopleView.setPeopleAvatarClickListeners(goToProfile);
  peopleView.setPeopleNameClickListeners(goToProfile);
  peopleView.setPeopleClickListeners(goToProfile);
};

init();
