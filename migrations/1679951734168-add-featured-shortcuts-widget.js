'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ObjectId } = require('mongodb')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { runMigration } = require('../utils/mongodb')

module.exports.up = runMigration(async (db) => {
  // If the first item in a user's MySpace is not FeaturedShortcuts, add it.
  // `default: true` lets us know we've added it as a default and not the user.
  await db.collection('users').updateMany(
    {
      'mySpace.0.type': {
        $ne: 'FeaturedShortcuts',
      },
    },
    {
      $push: {
        mySpace: {
          $each: [
            {
              _id: new ObjectId(),
              title: 'Featured Shortcuts',
              type: 'FeaturedShortcuts',
              default: true,
            },
          ],
          $position: 0,
        },
      },
    }
  )
})

module.exports.down = runMigration(async (db) => {
  await db.collection('users').updateMany(
    {
      'mySpace.0.type': {
        $eq: 'FeaturedShortcuts',
      },
      'mySpace.0.default': true,
    },

    {
      $pop: {
        mySpace: -1,
      },
    }
  )
})
