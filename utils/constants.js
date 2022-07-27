const {
  NODE_ENV,
  PORT = 3111,
  URL_CORS = 'http://localhost:3106',
  JWT_SECRET = 'keyword-for-token-generation-develop',
  DATA_BASE = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

module.exports = {
  NODE_ENV, JWT_SECRET, URL_CORS, PORT, DATA_BASE,
};

module.exports.codCreated = 201;
module.exports.codInternalServerError = 500;
module.exports.textErrorNoUser = 'Такого пользователя нет';
module.exports.textErrorNoCard = 'Такой карточки нет';
module.exports.textErrorNoValidEmailPassword = 'Неправильные почта или пароль';
module.exports.textMessageDeleteCard = 'Карточка удалена';
module.exports.textMessageOk = 'Всё верно!';
module.exports.regExURL = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/;
