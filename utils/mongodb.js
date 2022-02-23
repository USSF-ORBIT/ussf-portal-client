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

module.exports.connectDb = async () => {
  const client = MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // Use the jest database if testing
  const dbName =
    process.env.NODE_ENV === 'test' ? 'jest' : process.env.MONGODB_DB

  await client.connect()
  const db = client.db(dbName)
  return db
}
