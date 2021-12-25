const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './env/config.env' });

const app = require('./app');

const db = process.env.DB_STRING.replace(/<password>/, process.env.DB_PASSWORD);

mongoose
  .connect(db)
  .then(() => {
    console.log('DATABASE CONNECTED');
  })
  .catch(error => {
    console.log(error);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('SERVER STARTED ');
});

process.on('SIGTERM', () => {
  server.close();
});
