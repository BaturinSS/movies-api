const router = require('express').Router();

const { login } = require('../controllers/auth');

const {
  validationLogin,
} = require('../utils/requestVerification');

router
  .post('/', validationLogin, login);

module.exports = router;
