import { gql } from '@apollo/client'

export const SEARCH = gql`
  query Search($query: String!) {
    search(query: $query) {
      type
      title
      preview
      permalink
    }
  }
`
