const MongoClient = require('mongodb').MongoClient

const url = process.env.MONGO_URL
const client = new MongoClient(url, { useNewUrlParser: true })

const dbName = process.env.MONGODB_DB

async function main() {
  await client.connect()
  console.log('Connected successfully')
  const db = client.db(dbName)
  const collection = db.collection('users')

  // the following code examples can be pasted here...
  const findResult = await collection.find({}).toArray()
  console.log('Found users => ', findResult)

  return 'done.'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())
