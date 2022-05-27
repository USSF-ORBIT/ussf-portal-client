import { gql } from '@apollo/client'

export const GET_ARTICLE = gql`
  query GetArticle($slug: String) {
    article(where: { slug: $slug }) {
      id
      slug
      title
      body {
        document
      }
      publishedDate
    }
  }
`
