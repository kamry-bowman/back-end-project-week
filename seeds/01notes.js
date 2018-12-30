const noteSeedArray = require('../dummyData/noteSeedArray');
const tagSeedArray = require('../dummyData/tagSeedArray');
const notesTagsMapArray = require('../dummyData/notesTagsJoinArray');
const usersSeedArray = require('../dummyData/usersSeedArray');

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return Promise.resolve()
    .then(() =>
      knex.raw(
        'TRUNCATE "notesTagsJoin", notes, tags, users RESTART IDENTITY CASCADE'
      )
    )
    .then(() =>
      knex('users')
        .insert(usersSeedArray)
        .returning('id')
    )
    .then((ids) => knex('notes').insert(noteSeedArray))
    .then(() => knex('tags').insert(tagSeedArray))
    .then(() => knex('notesTagsJoin').insert(notesTagsMapArray));
};
