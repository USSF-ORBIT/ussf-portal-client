import { gql } from '@apollo/client'

export const ADD_COLLECTION = gql`
  mutation addCollection($title: String, $bookmarks: [Bookmark], $id: ID) {
    addCollection(title: $title, bookmarks: $bookmarks, id: $id) @client
  }
`
