import { gql, useMutation } from '@apollo/client'
import type { Collection } from 'types'
interface RemoveCollectionResponse {
  collections: Collection[]
}

interface RemoveCollectionInput {
  id: string
}
export const REMOVE_COLLECTION = gql`
  mutation removeCollection($id: ID!) {
    removeCollection(id: $id) @client
  }
`

export function useRemoveCollectionMutation() {
  return useMutation<RemoveCollectionResponse, RemoveCollectionInput>(
    REMOVE_COLLECTION
  )
}
