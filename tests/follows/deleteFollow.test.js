/*eslint-disable*/
const request = require('supertest');

const app = require('../../app');
const Follow = require('../../models/followModel');
const User = require('../../models/userModel');
const {
  connectToDatabase,
  initializeDatabase,
  users,
  apiBasePath
} = require('../db');
const {
  checkFollowersCount,
  checkFollowingsCount
} = require('./checkFollowersAndFollowingsCount');

beforeAll(connectToDatabase);
beforeEach(initializeDatabase);

let tokenOne, tokenTwo, userOne, userTwo, follow;
beforeEach(async function() {
  userOne = await User.findOne({ email: users.validUserOne.email });
  userTwo = await User.create(users.validUserTwo);

  follow = await Follow.create({ user: userOne.id, following: userTwo.id });

  const responseOne = await request(app)
    .post(`${apiBasePath}/users/login`)
    .send(users.validUserOne);

  const responseTwo = await request(app)
    .post(`${apiBasePath}/users/login`)
    .send(users.validUserTwo);

  tokenOne = responseOne.body.data.token;
  tokenTwo = responseTwo.body.data.token;
});

test('Should delete follow succesfully', async () => {
  userOne = await User.findOne({ email: users.validUserOne.email });
  userTwo = await User.findOne({ email: users.validUserTwo.email });

  await request(app)
    .delete(`${apiBasePath}/follows/${follow.id}`)
    .set('Authorization', `Bearer ${tokenOne}`)
    .expect(204);

  checkFollowingsCount(
    userOne,
    await User.findOne({ email: userOne.email }),
    -1
  );
  checkFollowersCount(
    userTwo,
    await User.findOne({ email: userTwo.email }),
    -1
  );
});

test('Should fail to delete follow (Unauthorized)', async () => {
  userOne = await User.findOne({ email: users.validUserOne.email });
  userTwo = await User.findOne({ email: users.validUserTwo.email });

  await request(app)
    .delete(`${apiBasePath}/follows/${follow.id}`)
    .set('Authorization', `Bearer ${tokenTwo}`)
    .expect(401);

  checkFollowingsCount(
    userOne,
    await User.findOne({ email: userOne.email }),
    0
  );
  checkFollowersCount(userTwo, await User.findOne({ email: userTwo.email }), 0);
});
