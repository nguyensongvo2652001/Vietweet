/*eslint-disable*/

const request = require('supertest');

const app = require('../../app');
const Follow = require('../../models/followModel');
const User = require('../../models/userModel');
const {
  connectToDatabase,
  initializeDatabase,
  users,
  apiBasePath
} = require('../db');

beforeAll(connectToDatabase);
beforeEach(initializeDatabase);

let token, userOne, userTwo;
beforeEach(async function() {
  userOne = await User.findOne({ email: users.validUserOne.email });
  userTwo = await User.create(users.validUserTwo);

  const response = await request(app)
    .post(`${apiBasePath}/users/login`)
    .send(users.validUserOne);

  ({ token } = response.body.data);
});

test('Should create a new follow document successfully', async () => {
  const response = await request(app)
    .post(`${apiBasePath}/follows`)
    .send({
      following: userTwo.id
    })
    .set('Authorization', `Bearer ${token}`)
    .expect(201);
});

test('Should not create a new follow document (users can not follow themselves)', async () => {
  await request(app)
    .post(`${apiBasePath}/follows`)
    .send({
      following: userOne.id
    })
    .set('Authorization', `Bearer ${token}`)
    .expect(400);
});

test('Should not create a new follow document (user already followed another user)', async () => {
  await Follow.create({ user: userOne.id, following: userTwo.id });
  await request(app)
    .post(`${apiBasePath}/follows`)
    .send({
      following: userTwo.id
    })
    .set('Authorization', `Bearer ${token}`)
    .expect(400);
});

test('Should not create a new follow document (without jwt)', async () => {
  await request(app)
    .post(`${apiBasePath}/follows`)
    .send({
      following: userTwo.id
    })
    .expect(400);
});
