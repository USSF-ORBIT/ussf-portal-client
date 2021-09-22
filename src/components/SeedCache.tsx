import { useEffect } from 'react'
import { v4 } from 'uuid'
import { Collection } from 'types/index'
import { useAddCollectionMutation } from 'operations/mutations/addCollection'
import { useCollectionsQuery } from 'operations/queries/getCollections'

const SeedCache = () => {
  const { data } = useCollectionsQuery()
  const [addCollection] = useAddCollectionMutation()

  if (data !== undefined && data.collections.length > 0) return null

  // Create a default collection to add to the cache for testing
  const exampleCollection: Collection = {
    id: v4(),
    title: 'Example Collection',
    bookmarks: [
      {
        id: v4(),
        url: 'https://google.com',
        label: 'Webmail',
        description: 'Lorem ipsum',
      },
      {
        id: v4(),
        url: 'https://mypay.dfas.mil/#/',
        label: 'MyPay',
        description: 'Lorem ipsum',
      },
      {
        id: v4(),
        url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
        label: 'vMPF',
        description: 'Lorem ipsum',
      },
      {
        id: v4(),
        url: 'https://leave.af.mil/profile',
        label: 'LeaveWeb',
        description: 'Lorem ipsum',
      },
      {
        id: v4(),
        url: 'https://www.e-publishing.af.mil/',
        label: 'e-Publications',
        description: 'Lorem ipsum',
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
