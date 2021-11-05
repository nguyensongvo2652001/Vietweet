/*eslint-disable*/

const checkFollowersCount = async function(user, newUser, changedValue) {
  expect(newUser.followersCount).toEqual(user.followersCount + changedValue);
};

const checkFollowingsCount = async function(user, newUser, changedValue) {
  expect(newUser.followingsCount).toEqual(user.followingsCount + changedValue);
};

module.exports = { checkFollowersCount, checkFollowingsCount };
