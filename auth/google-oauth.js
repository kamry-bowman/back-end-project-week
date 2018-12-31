const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const makeUser = require('../utils/makeGoogleUser');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const urlRoot =
  process.env.NODE_ENV === 'production'
    ? 'https://kam-ln-api.herokuapp.com'
    : 'http://localhost:8000';

const options = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${urlRoot}/auth/google/callback`,
};

const init = (db) => {
  return new GoogleStrategy(
    options,
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const username = makeUser(profile.id);
      try {
        let user = await db('users')
          .where('username', '=', username)
          .first();
        if (!user) {
          const [id] = await db('users')
            .insert({ username, account: 'google' })
            .returning('id');
          user = { username, id };
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  );
};

module.exports = init;
