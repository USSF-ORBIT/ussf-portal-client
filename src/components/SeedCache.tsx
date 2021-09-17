import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { v4 } from 'uuid'
import { Collection } from 'types/index'
import { ADD_COLLECTION } from 'operations/mutations/addCollection'
import { ADD_BOOKMARK } from 'operations/mutations/addBookmark'

import { REMOVE_BOOKMARK } from 'operations/mutations/removeBookmark'
const SeedCache = () => {
  const [addCollection] = useMutation(ADD_COLLECTION)
  const [addBookmark] = useMutation(ADD_BOOKMARK)
  // const { data } = useQuery(GET_COLLECTIONS, {
  //   variables: { id: '5d316554-7713-45a0-9e64-005808dc5f69' },
  // })

  const [removeBookmark] = useMutation(REMOVE_BOOKMARK)

  // Create a default collection to add to the cache for testing
  const searchCollection: Collection = {
    id: v4(),
    title: 'Search Engines',
    bookmarks: [
      {
        id: v4(),
        url: 'https://google.com',
        label: 'Google',
        description: 'Google home page',
      },
      {
        id: v4(),
        url: 'https://bing.com',
        label: 'Bing',
        description: 'Bing home page',
      },
      {
        id: v4(),
        url: 'https://duckduckgo.com',
        label: 'Duck Duck Go',
        description: 'Quack',
      },
    ],
  }

  useEffect(() => {
    addCollection({
      variables: {
        id: searchCollection.id,
        title: searchCollection.title,
        bookmarks: searchCollection.bookmarks,
      },
    })

    // addBookmark({
    //   variables: {
    //     url: 'amazon.com',
    //     label: 'Amazon',
    //     description: 'Shopping',
    //     collection_id: '5d316554-7713-45a0-9e64-005808dc5f69',
    //   },
    // })

    // removeBookmark({
    //   variables: {
    //     id: 'e2bd1d18-3d18-4ea1-8937-ffd40019a84e',
    //     collection_id: '5d316554-7713-45a0-9e64-005808dc5f69',
    //   },
    // })
  }, [])
  return <></>
}

export default SeedCache
