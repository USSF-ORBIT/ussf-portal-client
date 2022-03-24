import { gql, useMutation } from '@apollo/client'
import { ObjectId } from 'bson'

interface RemoveCollectionResponse {
  _id: ObjectId
}
interface RemoveCollectionInput {
  _id: ObjectId
}
export const REMOVE_COLLECTION = gql`
  mutation removeCollection($_id: OID!) {
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
