import mongoose from 'mongoose'
import { UserModel, UserDocument, UserInput } from '../models/user.model'

export async function createUser(input: UserInput) {
  return UserModel.create(input)
}

export async function findUser(input: UserInput) {
  return UserModel.findOne(input)
}

export async function getUserId(input: UserInput) {
  console.log('Get User Id from CAC ID')
  // #TODO Complete this function w/ SHA etc
}
