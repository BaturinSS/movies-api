const InternalServerError = require('../errors/InternalServerError');

module.exports.logoutUser = (req, res, next) => {
  try {
    res
      .clearCookie('jwt')
      .send({ message: 'Вы вышли!' });
  } catch (err) {
    next(new InternalServerError());
  }
};
