import { gql, useMutation } from '@apollo/client'
import type { Collection } from 'types'

interface AddCollectionsResponse {
  collections: Collection[]
}

interface AddCollectionsInput {
  collections: Collection[]
}

export const ADD_COLLECTIONS = gql`
  mutation addCollections($collections: [Collection]) {
    addCollections(collections: $collections) @client
  }
`

export function useAddCollectionsMutation() {
  return useMutation<AddCollectionsResponse, AddCollectionsInput>(
    ADD_COLLECTIONS
  )
}
