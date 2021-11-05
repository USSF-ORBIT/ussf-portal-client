import { gql, useMutation } from '@apollo/client'
import type { Bookmark, BookmarkInput } from 'types'

interface AddCollectionResponse {
  _id: string
  title: string
  bookmarks: Bookmark[]
}

interface AddCollectionInput {
  title: string
  bookmarks: BookmarkInput[]
}

export const ADD_COLLECTION = gql`
  mutation addCollection($title: String, $bookmarks: [BookmarkInput]!) {
    addCollection(title: $title, bookmarks: $bookmarks) {
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

export function useAddCollectionMutation() {
  return useMutation<AddCollectionResponse, AddCollectionInput>(ADD_COLLECTION)
}
