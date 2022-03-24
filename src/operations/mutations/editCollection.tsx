import { gql, useMutation } from '@apollo/client'
import { ObjectId } from 'bson'
import type { Bookmark } from '../../types/index'

interface EditCollectionResponse {
  _id: ObjectId
  title: string
  bookmarks: Bookmark[]
}

interface EditCollectionInput {
  title: string
  _id: ObjectId
}

export const EDIT_COLLECTION = gql`
  mutation editCollection($title: String!, $_id: OID!) {
    editCollection(_id: $_id, title: $title) {
      _id
      title
    }
  }
`

export function useEditCollectionMutation() {
  return useMutation<EditCollectionResponse, EditCollectionInput>(
    EDIT_COLLECTION
  )
}
