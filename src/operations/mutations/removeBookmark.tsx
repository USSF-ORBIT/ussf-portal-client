import { gql } from '@apollo/client'

export const REMOVE_BOOKMARK = gql`
  mutation removeBookmark($id: ID!, $collection_id: ID!) {
    removeBookmark(id: $id, collection_id: $collection_id) @client
  }
`
