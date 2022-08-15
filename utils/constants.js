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

module.exports.TEXT_ERROR_NO_VALID_EMAIL_PASSWORD = 'Неправильные почта или пароль';
module.exports.TEXT_ERROR_INTERNEL_SERVER = 'На сервере произошла ошибка';
module.exports.TEXT_ERROR_NO_USER = 'Такого пользователя нет';
module.exports.TEXT_ERROR_NO_FILM = 'Такого фильма нет';
module.exports.TEXT_ERROR_CONFLICT_DB = 'Такой фильм уже выбран !';

module.exports.TEXT_MESSAGE_DELETE_FILM = 'Фильм удалён';
module.exports.TEXT_MESSAGE_NO_FAVORITE_FILMS = 'Избранных фильмов нет';
module.exports.TEXT_MESSAGE_OK = 'Всё верно!';

module.exports.COD_INTERNAL_SERVER_ERROR = 500;
module.exports.COD_CREATED = 201;
