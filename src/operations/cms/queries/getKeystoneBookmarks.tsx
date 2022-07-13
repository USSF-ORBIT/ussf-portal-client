import { gql } from '@apollo/client'
import type { Bookmark } from 'types'

export interface BookmarksQueryResponse {
  bookmarks: Bookmark[]
}

export const GET_KEYSTONE_BOOKMARKS = gql`
  query GetKeystoneBookmarks {
    bookmarks(orderBy: [{ label: asc }]) {
      id
      url
      label
      description
    }
  }
`
