import { MongoClient } from 'mongodb'
import { testUser } from './user'

const DB = process.env.MONGODB_DB

export async function seedDB() {
  const host = process.env.MONGO_HOST || ''
  const user = process.env.MONGO_USER || ''
  const password = process.env.MONGO_PASSWORD || ''

  let connectionString
  if (process.env.NODE_ENV === 'development') {
    connectionString = `mongodb://mongo:27017/${DB}`
  } else {
    connectionString = `mongodb://${user}:${password}@${host}/?tls=true&tlsCAFile=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`
  }

  const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    await client.connect()

    console.log('Connected correctly to server')
    const collection = client.db(DB).collection('users')

    await collection.insertOne(testUser)
    console.log(`${DB} database seeded!`)

    client.close()
  } catch (err: any) {
    console.log(err.stack)
  }
}
