import { gql, useMutation } from '@apollo/client'
import type { Collection, CollectionRecords } from 'types'

interface AddCollectionsResponse {
  collections: Collection[]
}

interface AddCollectionsInput {
  collections: CollectionRecords
}

export const ADD_COLLECTIONS = gql`
  mutation addCollections($collections: [CollectionRecord!]!) {
    addCollections(collections: $collections) {
      _id
      title
      bookmarks {
        _id
        url
        label
      }
    }
  }
`

export function useAddCollectionsMutation() {
  return useMutation<AddCollectionsResponse, AddCollectionsInput>(
    ADD_COLLECTIONS
  )
}
