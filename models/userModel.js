const crypto = require('crypto');

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username must be defined'],
      unique: [true, 'An user with this username already existed'],
      trim: true
    },
    name: {
      type: String,
      maxlength: [50, 'Your name is too long. Please use another one'],
      trim: true,
      default: function() {
        return this.username;
      }
    },
    bio: {
      type: String,
      maxlength: [160, 'Your biography is too long. Please try another one'],
      trim: true
    },
    location: {
      type: String,
      maxlength: [30, 'Your location is too long. Please try another one'],
      trim: true
    },
    website: {
      type: String,
      maxlength: [100, 'Your website url is too long. Please try another one'],
      trim: true
    },
    dateOfBirth: {
      type: Date
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
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/
          );
        },
        message:
          'Your password is not strong enough. Password must contain at least 10 characters, one uppercase letter, one lowercase letter, one number and one special character'
      },
      select: false
    },
    passwordChangedAt: {
      type: Date,
      select: false
    },
    avatar: {
      type: String,
      default: 'default.jpg'
    },
    background: {
      type: String,
      default: 'default.jpg'
    },
    role: {
      type: String,
      default: 'user',
      enum: {
        values: ['user', 'admin'],
        message: 'Invalid role. Please try again'
      },
      select: false
    },
    dateJoined: {
      type: Date,
      default: Date.now()
    },
    followersCount: {
      type: Number,
      default: 0
    },
    followingsCount: {
      type: Number,
      default: 0
    },
    passwordResetToken: {
      type: String,
      select: false
    },
    passwordResetTokenExpiresAt: {
      type: Date,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.virtual('followings', {
  ref: 'Follow',
  localField: '_id',
  foreignField: 'user',
  select: 'id'
});

userSchema.pre('save', async function(next) {
  if (!this.isNew || !this.isModified('password')) return next();

  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.PASSWORD_BCRYPT_SALT_NUMBER)
  );

  next();
});

userSchema.methods.checkPassword = async function(
  candidatePassword,
  correctPassword
) {
  return await bcrypt.compare(candidatePassword, correctPassword);
};

userSchema.methods.changedPasswordAfter = function(passwordChangedAt, date) {
  if (!passwordChangedAt) return false;
  return passwordChangedAt.getTime() > date * 1000;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetTokenExpiresAt =
    Date.now() + process.env.PASSWORD_RESET_TOKEN_EXPIRED_MINUTES * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
