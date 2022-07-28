const Movie = require('../models/movie');

const {
  codCreated, textErrorNoFilm,
  textMessageDeleteFilm,
} = require('../utils/constants');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const AccessError = require('../errors/AccessError');

module
  .exports
  .getMovies = (req, res, next) => {
    const owner = req.user._id;
    Movie
      .find({ owner })
      .then((films) => {
        if (films.length === 0) {
          res.send({ message: 'Избранных фильмов нет' });
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
          .status(codCreated)
          .send(film);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ValidationError());
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
          throw new NotFoundError(textErrorNoFilm);
        } else if (film.owner.toHexString() !== req.user._id) {
          throw new AccessError();
        }
        film
          .remove()
          .then(() => {
            res
              .send({ message: textMessageDeleteFilm, film });
          })
          .catch(next);
      })
      .catch(next);
  };
