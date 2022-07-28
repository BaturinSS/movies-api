const router = require('express').Router();

const { login } = require('../controllers/auth');

const {
  validationUser,
} = require('../utils/requestVerification');

router
  .post('/', validationUser, login);

module.exports = router;
