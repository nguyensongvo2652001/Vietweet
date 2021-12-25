const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

const User = require('../models/userModel');
const Tweet = require('../models/tweetModel');
const Follow = require('../models/followModel');
const Like = require('../models/likeModel');
const Reply = require('../models/replyModel');

dotenv.config({ path: '../env/config.env' });

const db = process.env.DB_STRING.replace(/<password>/, process.env.DB_PASSWORD);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

mongoose
  .connect(db)
  .then(() => {
    console.log('DATABASE CONNECTED');
  })
  .catch(error => {
    console.log(error);
  });

const clearAll = async () => {
  await User.deleteMany();
  await Tweet.deleteMany();
  await Follow.deleteMany();
  await Like.deleteMany();
  await Reply.deleteMany();
  console.log('DELETE ALL SUCCESSFULLY');
  process.exit(0);
};

const importUsers = async () => {
  await User.create(users);
  console.log('IMPORT USERS SUCESSFULLY');
  process.exit(0);
};

const argv = process.argv[2];
if (argv === '--clear') clearAll();
if (argv === '--import-users') importUsers();
