import { gql } from 'graphql-tag'

export const GET_LANDING_PAGE = gql`
  query GetLandingPage($slug: String) {
    landingPage(where: { slug: $slug }) {
      pageTitle
      pageDescription
      slug
      articles {
        title
        preview
        publishedDate
        slug
        labels {
          name
        }
        category {
          name
        }
      }
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
    }
  }
`
