/*eslint-disable*/
const request = require('supertest');

const app = require('../../../app');
const User = require('../../../models/userModel');
const {
  connectToDatabase,
  initializeDatabase,
  users,
  apiBasePath
} = require('../../db');

beforeAll(connectToDatabase);
beforeEach(initializeDatabase);

test('Test signup with a valid user', async function() {
  const response = await request(app)
    .post(`${apiBasePath}/users/signup`)
    .send(users.validUserTwo)
    .expect(201);

  //Test if there is a jwt cookie
  expect(
    response.headers['set-cookie'].some(cookieString =>
      cookieString.startsWith('jwt')
    )
  ).toBe(true);

  expect(response.body.data.token).not.toBeNull();
});

test('Test signup with an invalid user (duplicated field)', async function() {
  await request(app)
    .post(`${apiBasePath}/users/signup`)
    .send(users.validUserOne)
    .expect(400);
});

test('Test signup with an invalid user (validation error)', async function() {
  await request(app)
    .post(`${apiBasePath}/users/signup`)
    .send(users.validationErrorUser)
    .expect(400);
});
