const {
  NODE_ENV,
  PORT = 3000,
  URL_CORS = 'http://localhost:3106',
  JWT_SECRET = 'keyword-for-token-generation-develop',
  DATA_BASE = 'mongodb://localhost:27017/moviesdb',
} = process.env;

module.exports = {
  NODE_ENV, JWT_SECRET, URL_CORS, PORT, DATA_BASE,
};

module.exports.regExURL = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/;
module.exports.textErrorNoValidEmailPassword = 'Неправильные почта или пароль';
module.exports.textErrorInternalServer = 'На сервере произошла ошибка';
module.exports.textErrorNoUser = 'Такого пользователя нет';
module.exports.textMessageDeleteFilm = 'Фильм удалён';
module.exports.textErrorNoFilm = 'Такого фильма нет';
module.exports.textMessageOk = 'Всё верно!';
module.exports.codInternalServerError = 500;
module.exports.codCreated = 201;
