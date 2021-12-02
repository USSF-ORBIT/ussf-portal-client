// eslint-disable-next-line
const { MongoClient } = require('mongodb')
// eslint-disable-next-line
const { testUser } = require('./users.js')
const DB = 'cypress-e2e'

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

module.exports.seedDB = async () => {
  // Connection URL

  const uri = `${process.env.MONGO_URL}`

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
    return err
  }
}
