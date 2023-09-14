import { gql } from 'graphql-tag'

export const GET_LABELS = gql`
  query GetLabels {
    labels {
      name
    }
  }
`
