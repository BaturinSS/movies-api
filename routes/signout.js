const router = require('express').Router();

const { logoutUser } = require('../controllers/auth');

router
  .post('/', logoutUser);

module.exports = router;
