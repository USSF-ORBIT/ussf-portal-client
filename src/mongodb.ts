//IMPORT MONGOOSE
import mongoose, { Model } from 'mongoose'

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { MONGODB_URI } = process.env

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(MONGODB_URI as string)
    .catch((err) => console.log(err))
  console.log('Mongoose Connection Established')

  return { conn }
}
