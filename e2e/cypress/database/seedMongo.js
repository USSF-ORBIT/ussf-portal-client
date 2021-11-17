// eslint-disable-next-line
const { MongoClient } = require('mongodb')
// eslint-disable-next-line
const { testUser } = require('./users.js')
const DB = 'cypress-e2e'

console.log('what is my example user looking like', testUser)
async function dropAndSeed(mongoClient, collectionName, jsonData) {
  const collection = mongoClient.db(DB).collection(collectionName)

  await collection.drop().catch((e) => {
    console.log('error when dropping', e)
    if (e.code !== 26) {
      throw e
    }
  })
  await collection.insertOne(jsonData)
}

async function seedDB() {
  // Connection URL

  const uri = `mongodb://localhost:27017/${DB}`

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    await client.connect()

    console.log('Connected correctly to server')

    await dropAndSeed(client, 'users', testUser)

    console.log(`${DB} database seeded!`)

    client.close()
  } catch (err) {
    console.log(err.stack)
  }
}

seedDB()
