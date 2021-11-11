/*eslint-disable*/

const request = require('supertest');
const sinon = require('sinon');

const authController = require('../../controllers/authController');
sinon.stub(authController, 'protect').callsFake(async (req, res, next) => {
  req.user = await User.findById(req.body.user);
  next();
});

const app = require('../../app');

const Tweet = require('../../models/tweetModel');
const User = require('../../models/userModel');
const Follow = require('../../models/followModel');
const {
  connectToDatabase,
  initializeDatabase,
  users,
  apiBasePath
} = require('../db');

beforeAll(connectToDatabase);
beforeEach(initializeDatabase);

let userOne, userTwo;

beforeEach(async function() {
  await User.deleteMany({});

  userTwo = await User.create(users.validUserTwo);
  userOne = await User.create(users.validUserOne);

  await Tweet.create({ user: userOne.id, content: 'One' });
  await Tweet.create({ user: userOne.id, content: 'Two' });
  await Tweet.create({ user: userTwo.id, content: 'Three' });

  await Follow.create({ user: userTwo.id, following: userOne.id });
});

test('Should get all tweets', async function() {
  const response = await request(app)
    .get(`${apiBasePath}/tweets`)
    .send({ user: userOne.id })
    .expect(200);

  expect(response.body.data.length).toEqual(3);
});

test('Should get tweets from followings or myself only', async function() {
  const response = await request(app)
    .get(`${apiBasePath}/tweets/feed`)
    .send({ user: userOne.id })
    .expect(200);

  expect(response.body.data.length).toEqual(2);
});
