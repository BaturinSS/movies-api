const cors = require('cors');

const { NODE_ENV, URL_CORS } = process.env;

let allowlist = URL_CORS
  ? URL_CORS.split(', ')
  : [];

const list = () => {
  if (!NODE_ENV) {
    allowlist = ['http://localhost:3106'];
  }
  return allowlist;
};

const allowedCors = {
  origin: list(),
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = cors(allowedCors);
