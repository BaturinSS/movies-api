const router = require('express').Router();

const {
  updateUser, getUserInfo,
} = require('../controllers/users');

const {
  validationProfile,
} = require('../utils/requestVerification');

router
  .get('/me', getUserInfo)
  .patch('/me', validationProfile, updateUser);

module.exports = router;
