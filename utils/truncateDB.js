function truncateDB(db) {
  return db.raw(
    'TRUNCATE "notesTagsJoin", notes, tags, users RESTART IDENTITY CASCADE'
  );
}

module.exports = truncateDB;
