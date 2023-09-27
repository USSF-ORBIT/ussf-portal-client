'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { runMigration } = require('../utils/mongodb')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports.up = runMigration(async (db) => {
  // Up migration code here
  // await db...
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports.down = runMigration(async (db) => {
  // Down migration code here
  // await db...
})
