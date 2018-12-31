const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const options = {};

const init = (db) => {
  return new LocalStrategy(options, (username, password, done) => {
    return db('users')
      .where('username', '=', username)
      .first()
      .then(async (user) => {
        if (!user || !user.password) {
          return done(null, false);
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((err) => {
        console.log(err);
        return done(err);
      });
  });
};

module.exports = init;
