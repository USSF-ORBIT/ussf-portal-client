import { gql, useMutation } from '@apollo/client'
import type { Bookmark, NewBookmarkInput } from 'types'

interface AddCollectionResponse {
  _id: string
  title: string
  bookmarks: Bookmark[]
}

interface AddCollectionInput {
  title: string
  bookmarks: NewBookmarkInput[]
}

export const ADD_COLLECTION = gql`
  mutation addCollection($title: String!, $bookmarks: [BookmarkInput!]!) {
    addCollection(title: $title, bookmarks: $bookmarks) {
      _id
      title
      bookmarks {
        _id
        url
        label
        cmsId
      }
    }
  }
`

export function useAddCollectionMutation() {
  return useMutation<AddCollectionResponse, AddCollectionInput>(ADD_COLLECTION)
}
