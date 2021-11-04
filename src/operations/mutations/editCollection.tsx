import { gql, useMutation } from '@apollo/client'
import type { Bookmark } from '../../types/index'

interface EditCollectionResponse {
  _id: string
  title: string
  bookmarks: Bookmark[]
}

interface EditCollectionInput {
  title: string
  _id: string
}

export const EDIT_COLLECTION = gql`
  mutation editCollection($title: String!, $_id: ID!) {
    editCollection(_id: $_id, title: $title) {
      _id
      title
      bookmarks {
        _id
        label
        url
      }
    }
  }
`

export function useEditCollectionMutation() {
  return useMutation<EditCollectionResponse, EditCollectionInput>(
    EDIT_COLLECTION
  )
}
