const router = require('express').Router();

const { createUser } = require('../controllers/auth');

const {
  validationUser,
} = require('../utils/requestVerification');

router
  .post('/', validationUser, createUser);

module.exports = router;
