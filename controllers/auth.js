const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const InternalServerError = require('../errors/InternalServerError');

const {
  codCreated, textErrorNoUser,
  textMessageOk,
  NODE_ENV, JWT_SECRET,
} = require('../utils/constants');

module.exports.login = (req, res, next) => {
  User
    .findUserByCredentials(req.body)
    .then((data) => {
      if (!data) {
        throw new NotFoundError(textErrorNoUser);
      }
      const user = data.toJSON();
      delete user.password;
      const token = jwt.sign(
        { _id: data._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      if (NODE_ENV === 'production') {
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          })
          .send({ message: textMessageOk, user });
      } else {
        res.send({ token, message: textMessageOk, user });
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      User
        .create(req.body)
        .then((data) => {
          const user = data.toJSON();
          delete user.password;
          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );
          if (NODE_ENV === 'production') {
            res
              .cookie('jwt', token, {
                maxAge: 3600000 * 24 * 7,
                httpOnly: true,
                secure: true,
                sameSite: 'none',
              })
              .status(codCreated)
              .send({ message: textMessageOk, user });
          } else {
            res
              .status(codCreated)
              .send({ token, message: textMessageOk, user });
          }
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError('При регистрации пользователя произошла ошибка'));
          } else if (err.name === 'MongoServerError') {
            next(new ConflictError('Пользователь с таким email уже существует.'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports.logoutUser = (req, res, next) => {
  try {
    res
      .clearCookie('jwt')
      .send({ message: 'Вы вышли!' });
  } catch (err) {
    next(new InternalServerError());
  }
};
