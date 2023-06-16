import { gql } from '@apollo/client'

export const GET_LABELS = gql`
  query GetLabels {
    labels {
      name
    }
  }
`
