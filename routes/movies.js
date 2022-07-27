const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  deleteMovie, createMovie, getMovies,
} = require('../controllers/movies');

const { regExURL } = require('../utils/constants');

router
  .get('/', getMovies)
  .post('/', celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(regExURL),
      trailerLink: Joi.string().required().regex(regExURL),
      thumbnail: Joi.string().required().regex(regExURL),
      movieId: Joi.string().required().hex(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }), createMovie)
  .delete('/:id', celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().hex().length(24),
    }),
  }), deleteMovie);

module.exports = router;
