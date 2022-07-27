const router = require('express').Router();

const auth = require('../middlewares/auth');

const signinRouter = require('./signin');
const signupRouter = require('./signup');
const signoutRouter = require('./signout');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');

router
  .use('/signin', signinRouter)
  .use('/signup', signupRouter)
  .use('/signout', signoutRouter)

  .use(auth)

  .use('/users', usersRouter)
  .use('/movies', moviesRouter)
  .use('/', (req, res, next) => {
    next(new NotFoundError());
  });

module.exports = router;
