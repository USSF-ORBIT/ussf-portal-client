import * as mongoDB from 'mongodb'

const connString = 'mongodb://admin-local:mysecretpassword@mongo:27017'

export async function connectToDB() {
  const client = await mongoDB.MongoClient.connect(connString, {
    useUnifiedTopology: true,
  })

  await client.connect()

  const db: mongoDB.Db = client.db('dev')

  return db
}
