import { gql } from '@apollo/client'

export const ADD_BOOKMARK = gql`
  mutation addBookmark(
    $url: String!
    $label: string
    $description: string
    $collection_id: ID!
  ) {
    addBookmark(
      url: $url
      label: $label
      description: $description
      collection_id: $collection_id
    ) @client
  }
`
