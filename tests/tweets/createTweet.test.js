/*eslint-disable*/

const request = require('supertest');

const app = require('../../app');
const Tweet = require('../../models/tweetModel');
const {
  connectToDatabase,
  initializeDatabase,
  users,
  apiBasePath
} = require('../db');

beforeAll(connectToDatabase);
beforeEach(initializeDatabase);

let token;

beforeEach(async function() {
  const response = await request(app)
    .post(`${apiBasePath}/users/login`)
    .send(users.validUserOne);

  ({ token } = response.body.data);
});

test('Should create tweet with only content successfully using the API ', async () => {
  const response = await request(app)
    .post(`${apiBasePath}/tweets`)
    .field('content', 'Hello World')
    .set('Authorization', `Bearer ${token}`)
    .expect(201);
  expect(response.body.data.tweet).not.toBeNull();
});

test('Should create tweet with both content and image successfully using the API ', async () => {
  const response = await request(app)
    .post(`${apiBasePath}/tweets`)
    .field('content', 'Hello World')
    .attach('image', 'tests/fixtures/testImage.jpeg')
    .set('Authorization', `Bearer ${token}`)
    .expect(201);

  expect(response.body.data.tweet).not.toBeNull();

  await request(app)
    .get(`/img/tweets/${response.body.data.tweet.image}`)
    .expect(200);
});

test('Should not create a new tweet without any content successfully', async () => {
  const response = await request(app)
    .post(`${apiBasePath}/tweets`)
    .attach('image', 'tests/fixtures/testImage.jpeg')
    .set('Authorization', `Bearer ${token}`)
    .expect(400);

  expect(response.body.message).not.toBeNull();
});

test('Should NOT create tweet with content longer than 200 characters using the API', async () => {
  //Create a random string with 300 characters (> 200)
  let string = '';
  for (let i = 0; i < 300; ++i) string += 'a';

  const response = await request(app)
    .post(`${apiBasePath}/tweets`)
    .field('content', string)
    .set('Authorization', `Bearer ${token}`)
    .expect(400);

  expect(response.body.message).not.toBeNull();
});

test('Should NOT create tweet without logging in', async () => {
  const response = await request(app)
    .post(`${apiBasePath}/tweets`)
    .expect(401);

  expect(response.body.message).not.toBeNull();
});
