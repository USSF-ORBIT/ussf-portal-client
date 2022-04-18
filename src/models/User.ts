import { Context, gql } from '@apollo/client'
import { client, cmsLink } from '../apolloClient'
import { EXAMPLE_COLLECTION_ID } from '../constants/index'
import { CollectionModel } from './Collection'
import type { PortalUser, Collection } from 'types/index'

const getExampleCollection = async () => {
  // Tell Apollo to use the CMS GraphQL endpoint
  client.setLink(cmsLink)
  // Request the example collection based on ID
  const res = await client.query({
    query: gql`
      query getCollection($where: CollectionWhereUniqueInput!) {
        collection(where: $where) {
          id
          title
          bookmarks {
            cmsId: id
            url
            label
          }
        }
      }
    `,
    variables: {
      where: {
        id: EXAMPLE_COLLECTION_ID,
      },
    },
  })

  return res.data.collection as Collection
}

const UserModel = {
  async findOne(userId: string, { db }: Context) {
    const foundUser = await db.collection('users').findOne({ userId })
    return foundUser
  },
  async createOne(userId: string, { db }: Context) {
    // Fetch example collection from Keystone
    const exampleCollection = await getExampleCollection()

    const newUser: PortalUser = {
      userId,
      mySpace: [],
    }
    // Create user
    await db.collection('users').insertOne(newUser)
    // Add example collection to user's My Space
    await CollectionModel.addOne(
      {
        title: exampleCollection.title,
        bookmarks: exampleCollection.bookmarks,
        userId: newUser.userId,
      },
      { db }
    )

    return true
  },
}

export default UserModel
