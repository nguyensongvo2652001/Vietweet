/*eslint-disable*/
const request = require('supertest');
const sinon = require('sinon');
const User = require('../../models/userModel');

const stubs = require('../utils/stubs');
stubs.stubProtectMiddleware();

const app = require('../../app');

const { setUpDatabase, apiBasePath } = require('../db');
setUpDatabase();

let userOne;
beforeEach(async () => {
  userOne = await User.create({
    username: 'test',
    email: 'test@example.com',
    password: 'Vietweet911!'
  });
});

test('Should get user profile', async () => {
  const response = await request(app)
    .get(`${apiBasePath}/users/${userOne.id}`)
    .send({ user: userOne.id })
    .expect(200);
});
