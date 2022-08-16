const Movie = require('../models/movie');

const {
  TEXT_MESSAGE_ADD_LIKE, TEXT_ERROR_NO_FILM,
  TEXT_MESSAGE_DELETE_FILM, TEXT_ERROR_CONFLICT_DB,
  TEXT_MESSAGE_NO_FAVORITE_FILMS, COD_CREATED,
} = require('../utils/constants');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const AccessError = require('../errors/AccessError');
const ConflictError = require('../errors/ConflictError');

module.exports.getMovies = (req, res, next) => {
  Movie
    .find({ likes: req.user._id })
    .then((films) => {
      if (films.length === 0) {
        res.send({ films, message: TEXT_MESSAGE_NO_FAVORITE_FILMS });
      } else {
        res.send({ films, message: '' });
      }
    })
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  Movie
    .findOneAndUpdate(
      { movieId: req.body.movieId },
      { $addToSet: { likes: req.user._id } },
      { new: true, upsert: true },
    )
    .findOneAndUpdate(req.body)
    .then((newFilm) => {
      res
        .status(COD_CREATED)
        .send({ newFilm, message: TEXT_MESSAGE_ADD_LIKE });
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

module.exports.deleteMovie = (req, res, next) => {
  Movie
    .findOneAndUpdate(
      { movieId: req.params.id },
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((newFilm) => {
      if (!newFilm) {
        throw new NotFoundError(TEXT_ERROR_NO_FILM);
      } else if (!newFilm.likes.map((el) => el.toHexString() !== req.user._id)) {
        throw new AccessError();
      }
      res.send({ message: TEXT_MESSAGE_DELETE_FILM, newFilm });
    })
    .catch(next);
};
