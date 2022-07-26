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
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = ({ email, password }) => this
  .findOne({ email }).select('+password')
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

module.exports = mongoose.model('user', userSchema);
