import React, { useEffect } from 'react'
import { v4 } from 'uuid'
import { Collection } from 'types/index'
import { useAddCollectionMutation } from 'operations/mutations/addCollection'
import { useRemoveBookmarkMutation } from 'operations/mutations/removeBookmark'
import { useCollectionsQuery } from 'operations/queries/getCollections'
import { useAddBookmarkMutation } from 'operations/mutations/addBookmark'
import { useRemoveCollectionMutation } from 'operations/mutations/removeCollection'
const SeedCache = () => {
  // const [addCollection] = useAddCollectionMutation()
  // const [addBookmark] = useAddBookmarkMutation()
  const testCollectionId = '32cb181e-c118-4046-a1f5-344e898ac1a5'
  const [removeCollection] = useRemoveCollectionMutation()
  // const { data } = useCollectionsQuery(testCollectionId)

  // console.log('Use Query to get one collections')
  // console.log(data)

  // const [removeBookmark] = useRemoveBookmarkMutation()

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
    // addCollection({
    //   variables: {
    //     id: searchCollection.id,
    //     title: searchCollection.title,
    //     bookmarks: searchCollection.bookmarks,
    //   },
    // })
    // addBookmark({
    //   variables: {
    //     url: 'tennis.com',
    //     label: 'Table Tennis',
    //     description: 'A website for Tennis enthusiasts',
    //     collectionId: testCollectionId,
    //   },
    // })
    // removeBookmark({
    //   variables: {
    //     id: '6b7a73f3-781d-4d64-b06e-72fbe6955b36',
    //     collectionId: testCollectionId,
    //   },
    // })
    // removeCollection({
    //   variables: {
    //     id: '8be444d6-38cd-4745-bdfe-fdb103c16003',
    //   },
    // })
  }, [])
  return <></>
}

export default SeedCache
