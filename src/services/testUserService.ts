import mongoose from 'mongoose'
import { createUser, findUser } from './user.service'
import { UserModel } from '../models/user.model'

async function run(): Promise<void> {
  const testUserId = '252c9a64-48bf-4b22-acd9-a211a9b0b272'

  await mongoose.connect('mongodb://localhost:27017/intro-to-mongo')

  const userPayload = {
    userId: testUserId,
  }

  const newUser = await createUser(userPayload)

  const foundUser = await findUser(userPayload)
  console.log('I found this user: ', foundUser)
  if (foundUser !== null) {
    console.log('The Object ID is ', foundUser._id)
    const foundUser2 = await UserModel.findById(foundUser._id)
    console.log('Did I find the user with the object id?', foundUser2)
  }

  mongoose.disconnect()
}

run().catch((err) => console.log(err))
