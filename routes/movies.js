const router = require('express').Router();

const {
  deleteMovie, createMovie, getMovies,
} = require('../controllers/movies');

const {
  validationMovie, validationMovieId,
} = require('../utils/requestVerification');

router
  .get('/', getMovies)
  .post('/', validationMovie, createMovie)
  .delete('/:id', validationMovieId, deleteMovie);

module.exports = router;
