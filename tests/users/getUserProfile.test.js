const request = require('supertest');

const stubs = require('../utils/stubs');
stubs.stubProtectMiddleware();

const app = require('../../app');
const User = require('../../models/userModel');
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
  await request(app)
    .get(`${apiBasePath}/users/${userOne.id}`)
    .send('user', userOne.id)
    .expect(200);
});
