import { gql, useMutation } from '@apollo/client'
import type { Bookmark } from '../../types/index'

interface EditCollectionResponse {
  id: string
  title: string
  bookmarks: Bookmark[]
}

interface EditCollectionInput {
  title: string
  id: string
}

export const EDIT_COLLECTION = gql`
  mutation editCollection($title: String!, $id: ID!) {
    editCollection(id: $id, title: $title) {
      id
      title
      bookmarks {
        id
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
