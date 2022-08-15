const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');

const {
  TEXT_ERROR_NO_USER, TEXT_MESSAGE_OK,
} = require('../utils/constants');

module.exports.getUserInfo = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(TEXT_ERROR_NO_USER);
      }
      res.send({ user, message: TEXT_MESSAGE_OK });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(TEXT_ERROR_NO_USER);
      }
      res
        .send({
          user,
          message: 'Профиль обновлен !!!',
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('При обновлении профиля произошла ошибка.'));
      } else if (err.codeName === 'DuplicateKey') {
        next(new ConflictError('Пользователь с таким email уже существует.'));
      } else {
        next(err);
      }
    });
};
