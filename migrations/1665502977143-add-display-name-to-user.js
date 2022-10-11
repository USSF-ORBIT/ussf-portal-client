'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { runMigration } = require('../utils/mongodb')

module.exports.up = runMigration(async (db) => {
  await db.collection('users').updateMany(
    {},
    {
      $set: {
        displayName: '',
      },
    }
  )
})

module.exports.down = runMigration(async (db) => {
  await db.collection('users').updateMany({}, { $unset: { displayName: '' } })
})
