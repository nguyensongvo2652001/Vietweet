/*eslint-disable*/

const fs = require('fs');

const request = require('supertest');
const mongoose = require('mongoose');

beforeAll(async () => {
  const db = process.env.DB_STRING.replace(
    /<password>/,
    process.env.DB_PASSWORD
  );

  await mongoose.connect(db);
});

beforeAll(async () => {
  await User.deleteMany();
});

const app = require('../../../app');
const User = require('../../../models/userModel');

const apiVersion = process.env.API_VERSION;
const apiBasePath = `/api/v${apiVersion}`;

const userData = JSON.parse(
  fs.readFileSync(`${__dirname}/../../fixtures/users.json`, 'utf-8')
);

test('Test signup with a valid user', async function() {
  const response = await request(app)
    .post(`${apiBasePath}/users/signup`)
    .send(userData.validUserOne)
    .expect(201);

  //Test if there is a jwt cookie
  expect(
    response.headers['set-cookie'].some(cookieString =>
      cookieString.startsWith('jwt')
    )
  ).toBe(true);

  expect(response.token).not.toBeNull();
});

test('Test signup with an invalid user (duplicated field)', async function() {
  await request(app)
    .post(`${apiBasePath}/users/signup`)
    .send(userData.validUserOne)
    .expect(400);
});

test('Test signup with an invalid user (validation error)', async function() {
  await request(app)
    .post(`${apiBasePath}/users/signup`)
    .send(userData.validationErrorUser)
    .expect(400);
});
