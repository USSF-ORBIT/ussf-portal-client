// Source: Official Next.js MongoDB example
// https://github.com/vercel/next.js/blob/master/examples/with-mongodb/util/mongodb.js

import { MongoClient } from 'mongodb'

// Required to use global._mongoClientPromise
declare global {
  /* eslint-disable-next-line */
  namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient>
    }
  }
}

const uri = process.env.MONGO_URL || ''
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise: Promise<MongoClient>

if (!process.env.MONGO_URL) {
  throw new Error('Please add your Mongo URI to docker-compose.yml')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
