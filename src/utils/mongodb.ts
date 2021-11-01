import * as mongoDB from 'mongodb'
import mongoose from 'mongoose'
const connString = 'mongodb://admin-local:mysecretpassword@mongo:27017'

export async function connectToDB() {
  // const client = await mongoDB.MongoClient.connect(connString, {
  //   useUnifiedTopology: true,
  // })

  // await client.connect()

  // const db: mongoDB.Db = client.db('dev')

  // return db

  const db = await mongoose.connect(
    'mongodb://admin-local:mysecretpassword@localhost:27017/dev'
  )

  return db
}
