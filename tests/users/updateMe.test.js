/*eslint-disable*/
/* PLEASE READ THIS: For some reasons, sinon does NOT work well with multipart/form-data. So I have to create a token manually and send it as a header */

const request = require('supertest');
const jwt = require('jsonwebtoken');

const User = require('../../models/userModel');
const { setUpDatabase, apiBasePath } = require('../db');

setUpDatabase();

let userOne, token;
beforeEach(async () => {
  userOne = await User.create({
    username: 'test',
    email: 'test@example.com',
    password: 'Vietweet911!'
  });

  token = await jwt.sign({ id: userOne.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
});
const app = require('../../app');

test('Should update user', async () => {
  const response = await request(app)
    .patch(`${apiBasePath}/users/me`)
    .field('bio', 'Hello World')
    .field('location', 'USA')
    .attach('avatar', 'tests/fixtures/testImage.jpeg')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
  const { bio, location, avatar } = response.body.data.user;
  expect(bio).toEqual('Hello World');
  expect(location).toEqual('USA');

  await request(app)
    .get(`/img/users/avatars/${avatar}`)
    .expect(200);
});
