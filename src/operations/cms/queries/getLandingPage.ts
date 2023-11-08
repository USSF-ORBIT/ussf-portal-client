import { gql } from 'graphql-tag'

export const GET_LANDING_PAGE = gql`
  query GetLandingPage($slug: String) {
    landingPage(where: { slug: $slug }) {
      pageTitle
      pageDescription
      slug
      documents {
        title
        document {
          title
          file {
            filename
            url
          }
        }
      }
      collections {
        title
        bookmarks {
          description
          url
          label
        }
      }
      articles {
        title
        slug
        preview
        publishedDate
        labels {
          id
          name
        }
      }
    }
  }
`
