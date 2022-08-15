const Movie = require('../models/movie');

const {
  COD_CREATED, TEXT_ERROR_NO_FILM,
  TEXT_MESSAGE_DELETE_FILM, TEXT_ERROR_CONFLICT_DB,
  TEXT_MESSAGE_NO_FAVORITE_FILMS,
} = require('../utils/constants');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const AccessError = require('../errors/AccessError');
const ConflictError = require('../errors/ConflictError');

module
  .exports
  .getMovies = (req, res, next) => {
    const owner = req.user._id;
    Movie
      .find({ owner })
      .then((films) => {
        if (films.length === 0) {
          res.send({ message: TEXT_MESSAGE_NO_FAVORITE_FILMS });
        } else {
          res.send(films);
        }
      })
      .catch((err) => next(err));
  };

module
  .exports
  .createMovie = (req, res, next) => {
    Movie
      .create({ ...req.body, owner: req.user._id })
      .then((film) => {
        res
          .status(COD_CREATED)
          .send(film);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ValidationError());
        } else if (err.code === 11000) {
          next(new ConflictError(TEXT_ERROR_CONFLICT_DB));
        } else {
          next(err);
        }
      });
  };

module
  .exports
  .deleteMovie = (req, res, next) => {
    Movie
      .findById(req.params.id)
      .then((film) => {
        if (!film) {
          throw new NotFoundError(TEXT_ERROR_NO_FILM);
        } else if (film.owner.toHexString() !== req.user._id) {
          throw new AccessError();
        }
        film
          .remove()
          .then(() => {
            res
              .send({ message: TEXT_MESSAGE_DELETE_FILM, film });
          })
          .catch(next);
      })
      .catch(next);
  };
