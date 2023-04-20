import { gql } from '@apollo/client'

export const SEARCH = gql`
  query Search($query: String!) {
    search(query: $query) {
      id
      type
      title
      preview
      permalink
      ... on ArticleResult {
        date
        labels {
          id
          name
          type
        }
        tags {
          id
          name
        }
      }
    }
  }
`
