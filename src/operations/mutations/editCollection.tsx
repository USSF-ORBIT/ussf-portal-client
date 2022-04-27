import { gql, useMutation } from '@apollo/client'
import type { ObjectId } from 'bson'
import type { Bookmark, BookmarkInput } from '../../types/index'

interface EditCollectionResponse {
  _id: ObjectId
  title: string
  bookmarks: Bookmark[]
}

interface EditCollectionInput {
  _id: ObjectId
  title: string
  bookmarks?: BookmarkInput[]
}

export const EDIT_COLLECTION = gql`
  mutation editCollection(
    $_id: OID!
    $title: String!
    $bookmarks: [BookmarkInput]!
  ) {
    editCollection(_id: $_id, title: $title, bookmarks: $bookmarks) {
      _id
      title
      bookmarks
    }
  }
`

export function useEditCollectionMutation() {
  return useMutation<EditCollectionResponse, EditCollectionInput>(
    EDIT_COLLECTION
  )
}
