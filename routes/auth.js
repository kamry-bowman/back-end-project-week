/* eslint-disable no-unused-expressions */
const { Router } = require('express');
const bcrypt = require('bcrypt');
const camelToSnake = require('../utils/camelToSnake');
const HttpError = require('../utils/HttpError');

const passportInit = require('../auth/config');

const successUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://kam-lambda-notes.netlify.com'
    : 'http://localhost:3000';

function makeRoute(db, passport) {
  const route = Router();
  passportInit(passport, db);

  route.post('/register', (req, res, next) => {
    return bcrypt
      .hash(req.body.password, 12)
      .then((hash) => {
        return db('users')
          .insert({
            username: req.body.username,
            password: hash,
          })
          .returning('*');
      })
      .then((response) => {
        return passport.authenticate('local', (err, user, info) => {
          if (user) {
            return res.status(200).json({ id: user.id });
          }
        })(req, res, next);
      })
      .catch((err) => {
        console.log(err);
        return next(new HttpError(500, 'Database failure'));
      });
  });

  route.post('/logout', (req, res, next) => {
    if (!req.user) {
      return next(new HttpError(401, 'Forbidden: User not authenticated'));
    }
    req.logOut();
    res.status(204).send();
  });

  route.get('/user', (req, res, next) => {
    if (!req.user) {
      return next(new HttpError(401, 'Forbidden: User not authenticated'));
    }
    const { username, id } = req.user;
    res.status(200).json({ username, id });
  });

  route.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(new HttpError(500, 'Database error occurred'));
      }
      if (!user) {
        return next(new HttpError(422, 'Login unsuccessful'));
      }
      if (user) {
        req.logIn(user, (err) => {
          if (err) {
            return next(new HttpError(422, 'Login unsuccessful'));
          }
          return res.status(200).json({ username: user.username });
        });
      }
    })(req, res, next);
  });

  route.get(
    '/google',
    passport.authenticate('google', { scope: ['openid', 'email'] })
  );

  route.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      return res.redirect(successUrl);
    }
  );

  return route;
}

module.exports = makeRoute;
