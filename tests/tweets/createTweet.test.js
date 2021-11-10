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

test('Should create a new tweet document successfully', async () => {
  await request(app)
    .post(`${apiBasePath}/tweets`)
    .field('content', 'Hello World')
    .attach('image', 'tests/fixtures/testImage.jpeg')
    .set('Authorization', `Bearer ${token}`)
    .expect(201);
});

test('Should not create a new tweet successfully', async () => {
  await request(app)
    .post(`${apiBasePath}/tweets`)
    .attach('image', 'tests/fixtures/testImage.jpeg')
    .set('Authorization', `Bearer ${token}`)
    .expect(400);
});
