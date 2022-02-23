'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { connectDb } = require('../utils/mongodb')

module.exports.up = async () => {
  const db = await connectDb()

  // Up migration code here
  // await db...
}

module.exports.down = async () => {
  const db = await connectDb()

  // Down migration code here
  // await db...
}
