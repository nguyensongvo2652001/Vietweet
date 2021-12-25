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
  checkFollowingsCount,
  checkFollowersCount
} = require('./checkFollowersAndFollowingsCount');

beforeAll(connectToDatabase);
beforeEach(initializeDatabase);

let token, userOne, userTwo;

beforeEach(async function() {
  userOne = await User.findOne({ email: users.validUserOne.email })
    .populate('followersCount')
    .populate('followingsCount');
  userTwo = await User.create(users.validUserTwo);

  userTwo = await userTwo.populate('followersCount');
  userTwo = await userTwo.populate('followingsCount');

  const response = await request(app)
    .post(`${apiBasePath}/users/login`)
    .send(users.validUserOne);

  ({ token } = response.body.data);
});

test('Should be able to follow someone you have not followed successfully', async () => {
  await request(app)
    .post(`${apiBasePath}/follows`)
    .send({
      following: userTwo.id
    })
    .set('Authorization', `Bearer ${token}`)
    .expect(201);

  checkFollowersCount(userTwo, await User.findOne({ email: userTwo.email }), 1);
  checkFollowingsCount(
    userOne,
    await User.findOne({ email: userOne.email }),
    1
  );
});

test('Should not create a new follow document (users can not follow themselves)', async () => {
  await request(app)
    .post(`${apiBasePath}/follows`)
    .send({
      following: userOne.id
    })
    .set('Authorization', `Bearer ${token}`)
    .expect(400);

  checkFollowersCount(userTwo, await User.findOne({ email: userTwo.email }), 0);
  checkFollowingsCount(
    userOne,
    await User.findOne({ email: userOne.email }),
    0
  );
});

test('Should not create a new follow document (user already followed another user)', async () => {
  await Follow.create({ user: userOne.id, following: userTwo.id });

  //Updated userOne, userTwo since the followingsCount and followersCount may be changed
  userOne = await User.findOne({ email: users.validUserOne.email });
  userTwo = await User.findOne({ email: users.validUserTwo.email });

  await request(app)
    .post(`${apiBasePath}/follows`)
    .send({
      following: userTwo.id
    })
    .set('Authorization', `Bearer ${token}`)
    .expect(400);

  checkFollowersCount(userTwo, await User.findOne({ email: userTwo.email }), 0);
  checkFollowingsCount(
    userOne,
    await User.findOne({ email: userOne.email }),
    0
  );
});

test('Should not create a new follow document (without jwt)', async () => {
  await request(app)
    .post(`${apiBasePath}/follows`)
    .send({
      following: userTwo.id
    })
    .expect(401);

  checkFollowersCount(userTwo, await User.findOne({ email: userTwo.email }), 0);
  checkFollowingsCount(
    userOne,
    await User.findOne({ email: userOne.email }),
    0
  );
});
