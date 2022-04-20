// MongoClient used by scripts (i.e., migrations) (no babel, no TypeScript)
/* eslint-disable @typescript-eslint/no-var-requires */

const { MongoClient } = require('mongodb')

// Connection string for DocumentDB
const connectionString = process.env.MONGO_URL

// Use the jest database if testing
const dbName = process.env.NODE_ENV === 'test' ? 'jest' : process.env.MONGODB_DB

const connectDb = async () => {
  const connection = await MongoClient.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = connection.db(dbName)

  return { db, connection }
}

module.exports.runMigration = (migration) => async () => {
  try {
    const { connection, db } = await connectDb()
    await migration(db)
    await connection.close()
  } catch (e) {
    console.log('[MIGRATION] Error with db connection', e)
    throw e
  }
}

module.exports.connectDb = connectDb
