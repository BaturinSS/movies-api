const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUser, getUserInfo,
} = require('../controllers/users');

router
  .get('/me', getUserInfo)
  .patch('/me', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }), updateUser);

module.exports = router;
