import { Context } from '@apollo/client'
import { ObjectId } from 'mongodb'

import type { PortalUser } from 'types/index'

/** THIS IS BAD :( but easiest way for now while we use embedded Keystone */
// TODO - change to use Keystone API on backend when we move to hosted Keystone
export const EXAMPLE_COLLECTION = {
  _id: new ObjectId(),
  cmsId: 'ckwz3u58s1835ql974leo1yll',
  title: 'Example Collection',
  bookmarks: [
    {
      _id: new ObjectId(),
      cmsId: 'cktd7c0d30190w597qoftevq1',
      url: 'https://afpcsecure.us.af.mil/',
      label: 'vMPF',
    },
    {
      _id: new ObjectId(),
      cmsId: 'cktd7ettn0457w597p7ja4uye',
      url: 'https://leave.af.mil/profile',
      label: 'LeaveWeb',
    },
    {
      _id: new ObjectId(),
      cmsId: 'cktd7hjz30636w5977vu4la4c',
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
    },
    {
      _id: new ObjectId(),
      cmsId: 'ckwz3tphw1763ql97pia1zkvc',
      url: 'https://webmail.apps.mil/',
      label: 'Webmail',
    },
    {
      _id: new ObjectId(),
      cmsId: 'ckwz3u4461813ql970wkd254m',
      url: 'https://www.e-publishing.af.mil/',
      label: 'e-Publications',
    },
  ],
}

const UserModel = {
  async findOne(userId: string, { db }: Context) {
    const foundUser = await db.collection('users').findOne({ userId })
    return foundUser
  },
  async createOne(userId: string, { db }: Context) {
    const newUser: PortalUser = {
      userId,
      mySpace: [EXAMPLE_COLLECTION],
    }

    await db.collection('users').insertOne(newUser)

    return true
  },
}

export default UserModel
