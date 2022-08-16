const {
  COD_INTERNAL_SERVER_ERROR, TEXT_ERROR_INTERNAL_SERVER,
} = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  const { statusCode = COD_INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === COD_INTERNAL_SERVER_ERROR
        ? TEXT_ERROR_INTERNAL_SERVER
        : message,
    });
  next();
});
