'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ObjectId } = require('mongodb')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { runMigration } = require('../utils/mongodb')

module.exports.up = runMigration(async (db) => {
  // If the first item is FeaturedShortcuts, and the second item in a
  // is not Guardian Ideal, add it as the second item in a user's MySpace.
  // `default: true` lets us know we've added it as a default and not the user.
  await db.collection('users').updateMany(
    {
      'mySpace.0.type': {
        $eq: 'FeaturedShortcuts',
      },
      'mySpace.1.type': {
        $ne: 'GuardianIdeal',
      },
    },
    {
      $push: {
        mySpace: {
          $each: [
            {
              _id: new ObjectId(),
              title: 'Guardian Ideal',
              type: 'GuardianIdeal',
              default: true,
            },
          ],
          $position: 1,
        },
      },
    }
  )

  // If the first item is not FeaturedShortcuts or GuardianIdeal,
  // add GuardianIdeal as the first item in a user's MySpace.
  await db.collection('users').updateMany(
    {
      'mySpace.0.type': {
        //$nin checks that the value is not in the array of values provided
        $nin: ['GuardianIdeal', 'FeaturedShortcuts'],
      },
    },
    {
      $push: {
        mySpace: {
          $each: [
            {
              _id: new ObjectId(),
              title: 'Guardian Ideal',
              type: 'GuardianIdeal',
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
    // Before removing anything, make sure we only look at
    // documents with the GuardianIdeal widget added by
    // the migration. `default: true` will be set.
    {
      'mySpace.type': {
        $eq: 'GuardianIdeal',
      },
      'mySpace.default': true,
    },
    // $pull will remove element(s) from the mySpace array where
    // the type matches 'GuardianIdeal'
    {
      $pull: {
        mySpace: {
          type: {
            $eq: 'GuardianIdeal',
          },
        },
      },
    }
  )
})
