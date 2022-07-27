const Movies = require('../models/movie');

const { codCreated } = require('../utils/constants');

const ValidationError = require('../errors/ValidationError');

module.exports.getMovies = (req, res, next) => {
  const { name, link } = req.body;
  Movies
    .create({ name, link, owner: req.movie._id })
    .then((movie) => {
      res
        .status(codCreated)
        .send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;
  Movies
    .create({ name, link, owner: req.movie._id })
    .then((movie) => {
      res
        .status(codCreated)
        .send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { name, link } = req.body;
  Movies
    .create({ name, link, owner: req.movie._id })
    .then((movie) => {
      res
        .status(codCreated)
        .send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};
