'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { connectDb } = require('../utils/mongodb')

module.exports.up = async () => {
  const db = await connectDb()

  await db
    .collection('users')
    .updateMany(
      {},
      { $set: { 'mySpace.$[widget].type': 'Collection' } },
      { arrayFilters: [{ 'widget.type': { $exists: false } }] }
    )
}

module.exports.down = async () => {
  const db = await connectDb()

  await db
    .collection('users')
    .updateMany(
      {},
      { $unset: { 'mySpace.$[widget].type': '' } },
      { arrayFilters: [{ 'widget.type': 'Collection' }] }
    )
}
