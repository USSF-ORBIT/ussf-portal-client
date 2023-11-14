import { gql } from 'graphql-tag'

export const GET_LANDING_PAGES = gql`
  query GetLandingPages {
    landingPages {
      pageTitle
      pageDescription
      slug
    }
  }
`
