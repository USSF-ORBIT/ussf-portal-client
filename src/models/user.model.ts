// import mongoose from 'mongoose'

// const connect = () => {
//   return mongoose.connect('mongodb://admin-local:mysecretpassword@mongo:27017/')
// }
// // Create schema for users
// const user = new mongoose.Schema({
//   userId: {
//     type: String,
//     required: true,
//   },
// })

// // Register schema as model
// export const User = mongoose.model('user', user)

// connect()
//   .then(async (connection) => {
//     const user = await User.create({ userId: '103938291939' })
//     console.log(user)
//   })
//   .catch((error) => console.log(error))
// import { Schema, model, connect } from 'mongoose'
import { Schema, model, connect, Document } from 'mongoose'
import * as crypto from 'crypto'
// 1. Create an interface representing a document in MongoDB.
export interface UserInput {
  userId: string
}

export interface UserDocument extends UserInput, Document {
  // hashUserId(userId: string): Promise<boolean>
  userId: string
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

// Virtual Methods
// Nothing here yet
// await UserModel.init() // build index to provide validation on unique id field

// When new user is created, hash the userId
// Note: The create() function fires save() hooks
// userSchema.pre('save', async function (this: UserDocument, next: any) {
//   // Only hash the userId if it is new or modified

//   if (this.isNew || this.isModified('userId')) {
//     const hash = crypto.createHash('sha256')

//     this.userId = hash.update(this.userId).digest('hex')

//     return next()
//   }
// })
// 3. Create a Model.
export const UserModel = model<UserDocument>('User', userSchema)
// 4. Connect to MongoDB

// async function run(): Promise<void> {
//   await connect('mongodb://localhost:27017/intro-to-mongo')

//   const doc = new UserModel({
//     userId: 'testidmongoosetypescript',
//   })
//   const newUser = await doc.save()
//   console.log(newUser)

// }

// run().catch((err) => console.log(err))
