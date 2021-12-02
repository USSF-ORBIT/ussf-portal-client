import { gql, useMutation } from '@apollo/client'

interface RemoveCollectionResponse {
  _id: string
}
interface RemoveCollectionInput {
  _id: string
}
export const REMOVE_COLLECTION = gql`
  mutation removeCollection($_id: ID!) {
    removeCollection(_id: $_id) {
      _id
    }
  }
`

export function useRemoveCollectionMutation() {
  return useMutation<RemoveCollectionResponse, RemoveCollectionInput>(
    REMOVE_COLLECTION
  )
}
