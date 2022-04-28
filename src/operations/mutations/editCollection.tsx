import { gql, useMutation } from '@apollo/client'
import type { ObjectId } from 'bson'
import type { Bookmark } from '../../types/index'

interface EditCollectionResponse {
  _id: ObjectId
  title: string
  bookmarks: Bookmark[]
}

interface EditCollectionInput {
  _id: ObjectId
  title?: string
  bookmarks?: Bookmark[]
}

export const EDIT_COLLECTION = gql`
  mutation editCollection(
    $_id: OID!
    $title: String
    $bookmarks: [BookmarkReorderInput]
  ) {
    editCollection(_id: $_id, title: $title, bookmarks: $bookmarks) {
      _id
      title
      bookmarks {
        _id
        url
        label
        cmsId
        isRemoved
      }
    }
  }
`

export function useEditCollectionMutation() {
  return useMutation<EditCollectionResponse, EditCollectionInput>(
    EDIT_COLLECTION
  )
}
