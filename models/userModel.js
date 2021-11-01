const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username must be defined'],
    unique: [true, 'An user with this username already existed'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email must be defined'],
    unique: [true, 'An user with this email already existed'],
    trim: true,
    validate: [validator.isEmail, 'Email is not valid']
  },
  password: {
    type: String,
    required: [true, 'Password must be defined'],
    validate: {
      validator: function(val) {
        return val.match(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{10,}$'
        );
      },
      message:
        'Your password is not strong enough. Password must contain at least 10 characters, one uppercase letter, one lowercase letter, one number and one special character'
    }
  },
  avatar: {
    type: String,
    default: '/img/users/avatars/default.jpg'
  },
  background: {
    type: String,
    default: '/img/users/backgrounds/default.jpg'
  },
  role: {
    type: String,
    default: 'user',
    enum: {
      values: ['user', 'admin'],
      message: 'Invalid role. Please try again'
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
