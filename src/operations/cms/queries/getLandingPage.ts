import { gql } from 'graphql-tag'

export const GET_LANDING_PAGE = gql`
  query GetLandingPage($slug: String) {
    landingPage(where: { slug: $slug }) {
      pageTitle
      badge {
        url
      }
      hero {
        url
      }
      pageDescription
      slug
      status
      publishedDate
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
        status
        labels {
          id
          name
          type
        }
      }
    }
  }
`
