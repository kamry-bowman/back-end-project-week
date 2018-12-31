const initPassport = require('./passport');
const initLocalStrategy = require('./local');
const initGoogleStrategy = require('./google-oauth');

const options = {};

const init = (passport, db) => {
  initPassport(passport, db);

  passport.use(initLocalStrategy(db));
  passport.use(initGoogleStrategy(db));
};

module.exports = init;
