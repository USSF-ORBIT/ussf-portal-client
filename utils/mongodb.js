// MongoClient used by scripts (i.e., migrations) (no babel, no TypeScript)
/* eslint-disable @typescript-eslint/no-var-requires */

const { MongoClient } = require('mongodb')

const host = process.env.MONGO_HOST || ''
const user = process.env.MONGO_USER || ''
const password = process.env.MONGO_PASSWORD || ''

const RDS_TLS_CERT = process.env.RDS_TLS_CERT || 'rds-combined-ca-bundle.pem'

// Connection string for DocumentDB
const connectionString =
  process.env.MONGO_URL ||
  `mongodb://${user}:${password}@${host}/?tls=true&tlsCAFile=${RDS_TLS_CERT}&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`

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
    console.error('[MIGRATION] Error with db connection', e)
    throw e
  }
}

module.exports.connectDb = connectDb
