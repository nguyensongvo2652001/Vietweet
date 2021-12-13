/*eslint-disable*/
import sidebarView from '../views/sidebarView.js';

import { redirect } from '../helper.js';

const search = query => {
  if (!query) return;
  sidebarView.clearSearchBarInput();
  redirect(`/search?q=${query}`);
};

const init = () => {
  sidebarView.addSearchbarIconClickListener(search);
};

init();
