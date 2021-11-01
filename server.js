const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const db = process.env.DB_STRING.replace(/<password>/, process.env.DB_PASSWORD);

mongoose.connect(db).then(() => {
  console.log('DATABASE CONNECTED');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('SERVER STARTED');
});
