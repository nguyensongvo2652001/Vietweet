/*eslint-disable*/
const fs = require('fs');

const request = require('supertest');

const app = require('../../../app');
const User = require('../../../models/userModel');
const { connectToDatabase, initializeDatabase } = require('../../db');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../../fixtures/users.json`, 'utf-8')
);

beforeAll(connectToDatabase);
beforeEach(initializeDatabase);

const apiVersion = process.env.API_VERSION;
const apiBasePath = `/api/v${apiVersion}`;

test('Test signup with a valid user', async function() {
  const response = await request(app)
    .post(`${apiBasePath}/users/signup`)
    .send(users.validUserOne)
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
  await User.create(users.validUserOne);

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
