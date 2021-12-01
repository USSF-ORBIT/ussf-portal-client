// Source: Official Next.js MongoDB example
// https://github.com/vercel/next.js/blob/master/examples/with-mongodb/util/mongodb.js

import { MongoClient } from 'mongodb'

// Required to use global._mongoClientPromise
declare global {
  /* eslint-disable-next-line */
  namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<typeof MongoClient>
    }
  }
}

const uri = process.env.MONGO_URL || ''
const host = process.env.MONGO_HOST || ''
const user = process.env.MONGO_USER || ''
const password = process.env.MONGO_PASSWORD || ''

const connectionString = `mongodb://${user}:${password}@${host}/?tls=true&tlsCAFile=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`

let client
let clientPromise: Promise<typeof MongoClient>

if (process.env.NODE_ENV === 'development') {
  if (!process.env.MONGO_URL) {
    throw new Error('Please add Mongo URI to your environment variables.')
  }
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(connectionString)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
