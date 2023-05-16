import { gql } from '@apollo/client'

export const GET_TAGS = gql`
  query GetTags {
    tags {
      name
    }
  }
`
