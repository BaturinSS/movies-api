const mongoose = require('mongoose');
const validatorJS = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageThumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validatorJS.isURL(value),
    },
  },
  imageSmall: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validatorJS.isURL(value),
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validatorJS.isURL(value),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    unique: true,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
