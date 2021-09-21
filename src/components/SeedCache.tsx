import React, { useEffect } from 'react'
import { v4 } from 'uuid'
import { Collection } from 'types/index'
import { useAddCollectionMutation } from 'operations/mutations/addCollection'
import { useCollectionsQuery } from 'operations/queries/getCollections'

const SeedCache = () => {
  const { data } = useCollectionsQuery()

  if (data !== undefined && data.collections.length > 0) return null

  const [addCollection] = useAddCollectionMutation()

  // Create a default collection to add to the cache for testing
  const exampleCollection: Collection = {
    id: v4(),
    title: 'Example Collection',
    bookmarks: [
      {
        id: v4(),
        url: 'https://google.com',
        label: 'Webmail',
      },
      {
        id: v4(),
        url: 'https://mypay.dfas.mil/#/',
        label: 'MyPay',
      },
      {
        id: v4(),
        url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
        label: 'vMPF',
      },
      {
        id: v4(),
        url: 'https://leave.af.mil/profile',
        label: 'LeaveWeb',
      },
      {
        id: v4(),
        url: 'https://www.e-publishing.af.mil/',
        label: 'e-Publications',
      },
    ],
  }

  useEffect(() => {
    addCollection({
      variables: {
        id: exampleCollection.id,
        title: exampleCollection.title,
        bookmarks: exampleCollection.bookmarks,
      },
    })
  }, [])
  return null
}

export default SeedCache
