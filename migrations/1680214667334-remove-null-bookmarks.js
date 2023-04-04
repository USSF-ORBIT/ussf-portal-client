'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { runMigration } = require('../utils/mongodb')

module.exports.up = runMigration(async (db) => {
  await db.collection('users').updateMany(
    {},
    {
      $pull: {
        'mySpace.$[collection].bookmarks': null,
      },
    },
    {
      arrayFilters: [{ 'collection.bookmarks': null }],
    }
  )
})

module.exports.down = (next) => {
  // nothing to do, null bookmarks were removed and we don't need them put back
  next()
}
