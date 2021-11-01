const path = require('path');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

module.exports = async () => {
  dotenv.config({ path: path.resolve(__dirname, '../env/test.env') });

  const db = process.env.DB_STRING.replace(
    /<password>/,
    process.env.DB_PASSWORD
  );

  mongoose.connect(db).then(() => {});
};
