import { gql } from '@apollo/client'

export const GET_SECONDARY_NAV = gql`
  query getSecondaryNav {
    secondaryNav {
      id
      links {
        path: url
        label
      }
    }
  }
`
