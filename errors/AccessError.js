class AccessError extends Error {
  constructor(message = 'Можно удалять, только свои фильмы!') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = AccessError;
