const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validatorJS = require('validator');

const { textErrorNoValidEmailPassword } = require('../utils/constants');

const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validatorJS.isEmail(value),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(textErrorNoValidEmailPassword);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(textErrorNoValidEmailPassword);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
