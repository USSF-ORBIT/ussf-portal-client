import { gql } from '@apollo/client'

export const REMOVE_COLLECTION = gql`
  mutation removeCollection($id: ID!) {
    removeCollection(id: $id) @client
  }
`
