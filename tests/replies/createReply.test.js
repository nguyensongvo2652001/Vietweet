/*eslint-disable*/

const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../../app');
const Tweet = require('../../models/tweetModel');
const User = require('../../models/userModel');
const { setUpDatabase, apiBasePath } = require('../db');

setUpDatabase();

let token, tweet;

beforeEach(async function() {
  //1. Create dummy user
  const user = await User.create({
    username: 'user1',
    email: 'user1@example.com',
    password: 'Vietweet911!'
  });

  token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  //2. Create dummy tweet
  tweet = await Tweet.create({ content: 'Hello World', user: user._id });
});

test('Should create reply with only content successfully using the API ', async () => {
  const response = await request(app)
    .post(`${apiBasePath}/replies`)
    .field('content', 'Hello World')
    .field('tweet', tweet._id.toString())
    .set('Authorization', `Bearer ${token}`)
    .expect(201);

  expect(response.body.data.reply).not.toBeNull();
  expect(response.body.data.reply.content).toEqual('Hello World');
});

test('Should create reply with both content and image successfully using the API ', async () => {
  const response = await request(app)
    .post(`${apiBasePath}/replies`)
    .field('content', 'Hello World')
    .field('image', `${__dirname}/../fixtures/testImage.jpeg`)
    .field('tweet', tweet._id.toString())
    .set('Authorization', `Bearer ${token}`)
    .expect(201);

  const { reply } = response.body.data;

  expect(reply).not.toBeNull();
  expect(reply.content).toEqual('Hello World');
  expect(reply.image).not.toBeNull();

  await request(app)
    .get(`/img/replies/${reply.image}`)
    .expect(302);
});

test('Should not be able to reply to a tweet without any content using the API', async () => {
  await request(app)
    .post(`${apiBasePath}/replies`)
    .field('tweet', tweet._id.toString())
    .set('Authorization', `Bearer ${token}`)
    .expect(400);
});

test('Should not be able to reply to a tweet with content longer than 200 characters using the API', async () => {
  //Generate a string with 300 characters
  let content = '';
  for (let i = 0; i < 300; ++i) content += 'a';

  await request(app)
    .post(`${apiBasePath}/replies`)
    .field('content', content)
    .field('tweet', tweet._id.toString())
    .set('Authorization', `Bearer ${token}`)
    .expect(400);
});

test('Should not create reply to a non-existent tweet (invalid id) using the API', async () => {
  await request(app)
    .post(`${apiBasePath}/replies`)
    .field('content', 'Hello World')
    .field('tweet', 'thistweetisnotreal')
    .set('Authorization', `Bearer ${token}`)
    .expect(400);
});

test('Should not create reply to a tweet without logging using the API', async () => {
  await request(app)
    .post(`${apiBasePath}/replies`)
    .field('content', 'Hello World')
    .field('tweet', tweet._id.toString())
    .expect(401);
});
