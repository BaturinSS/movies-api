const { celebrate, Joi } = require('celebrate');

const validatorJS = require('validator');

const checkURL = (value, helpers) => {
  const isValidURL = validatorJS.isURL(value, {
    require_protocol: true,
  });

  return isValidURL
    ? value
    : helpers.message('Неправильный адрес URL');
};

const validationUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const validationProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(checkURL),
    trailerLink: Joi.string().required().custom(checkURL),
    thumbnail: Joi.string().required().custom(checkURL),
    movieId: Joi.string().required().hex(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validationMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

module.exports = {
  validationProfile,
  validationUser,
  validationLogin,
  validationMovie,
  validationMovieId,
};
