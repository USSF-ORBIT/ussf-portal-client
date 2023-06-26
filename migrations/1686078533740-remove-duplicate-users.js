'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { runMigration } = require('../utils/mongodb')

module.exports.up = runMigration(async (db) => {
  const users = await db.collection('users').find({}).toArray()
  const userIds = users.map((user) => user.userId)
  const uniqueUserIds = [...new Set(userIds)]

  for (const userId of uniqueUserIds) {
    const usersWithSameUserId = users.filter((user) => user.userId === userId)
    if (usersWithSameUserId.length > 1) {
      const firstUser = usersWithSameUserId[0]
      const otherUsers = usersWithSameUserId.slice(1)

      // Merge the mySpace arrays, only keeping items of type 'Collection' from duplicate users
      const mergedMySpace = firstUser.mySpace.concat(
        ...otherUsers.map((user) =>
          user.mySpace.filter((item) => item.type === 'Collection')
        )
      )

      // Check if any of the duplicate users have a theme with the value 'dark'
      const hasDarkTheme = otherUsers.some((user) => user.theme === 'dark')

      // Delete the duplicate users based off of their userId and _id
      await db.collection('users').deleteMany({
        $or: otherUsers.map((user) => ({
          userId: user.userId,
          _id: user._id,
        })),
      })

      // Update the first user
      await db.collection('users').updateOne(
        { userId: firstUser.userId },
        {
          $set: {
            mySpace: mergedMySpace,
            theme: hasDarkTheme ? 'dark' : firstUser.theme,
          },
        }
      )
    }
  }

  // Make the userId field unique
  await db.collection('users').createIndex({ userId: 1 }, { unique: true })
})

module.exports.down = (next) => {
  // Do nothing. We don't need to put the duplicate users back.
  next()
}
