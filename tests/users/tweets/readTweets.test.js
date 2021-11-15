/*eslint-disable*/
const request = require('supertest');

const stubs = require('../../utils/stubs');

stubs.stubProtectMiddleware();

const app = require('../../../app');

const Tweet = require('../../../models/tweetModel');
const User = require('../../../models/userModel');

const { setUpDatabase, apiBasePath } = require('../../db');

setUpDatabase();

let userOne, userTwo;
beforeEach(async () => {
  userOne = await User.create({
    email: 'test@email.com',
    username: 'test',
    password: 'Vietweet911!'
  });
  userTwo = await User.create({
    email: 'test2@email.com',
    username: 'test2',
    password: 'Vietweet911!'
  });

  await Tweet.create({ user: userOne.id, content: 'Hello' });
  await Tweet.create({ user: userOne.id, content: 'Hello' });
  await Tweet.create({ user: userTwo.id, content: 'Hello' });
});

test('Should get tweets from userOne only', async () => {
  const response = await request(app)
    .get(`${apiBasePath}/users/${userOne.id}/tweets`)
    .send('user', userOne.id)
    .expect(200);
  expect(response.body.data.tweets.length).toEqual(2);
});
