import { gql } from '@apollo/client'

export const GET_COLLECTIONS = gql`
  query getCollections($id: ID) {
    collections(id: $id) @client {
      id
      title
      bookmarks
    }
  }
`
