const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser } = require('../controllers/auth');

router
  .post('/', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      password: Joi.string().required(),
      email: Joi.string().required().email(),
    }),
  }), createUser);

module.exports = router;
