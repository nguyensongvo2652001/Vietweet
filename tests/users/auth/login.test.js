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

test('Login with a valid user', async () => {
  await User.create(users.validUserOne);

  const response = await request(app)
    .post(`${apiBasePath}/users/login`)
    .send(users.validUserOne)
    .expect(200);

  //Test if there is a jwt cookie
  expect(
    response.headers['set-cookie'].some(cookieString =>
      cookieString.startsWith('jwt')
    )
  ).toBe(true);

  expect(response.token).not.toBeNull();
});

test('Login with an invalid user', async () => {
  await User.create(users.validUserOne);

  await request(app)
    .post(`${apiBasePath}/users/login`)
    .send({
      username: users.validUserOne.username,
      password: 'WRONGPASSWORD'
    })
    .expect(400);
});
