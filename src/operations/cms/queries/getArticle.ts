import { gql } from 'graphql-tag'

export const GET_ARTICLE = gql`
  query GetArticle($slug: String) {
    article(where: { slug: $slug }) {
      id
      slug
      category {
        name
      }
      title
      hero {
        url
      }
      body {
        document
      }
      publishedDate
      status
      byline {
        name
      }
      labels {
        id
        name
        type
      }
      location {
        name
      }
      tags {
        id
        name
      }
    }
  }
`
