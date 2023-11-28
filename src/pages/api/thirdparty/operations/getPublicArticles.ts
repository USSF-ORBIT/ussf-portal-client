import { gql } from 'graphql-tag'

export const GET_PUBLIC_ARTICLES = gql`
  query GetPublicArticles($publishedDate: DateTime, $tag: String) {
    articles(
      where: {
        status: { equals: Published }
        publishedDate: { lte: $publishedDate }
        category: { equals: InternalNews }
        tags: { some: { name: { equals: $tag } } }
      }
      orderBy: [{ publishedDate: desc }]
    ) {
      id
      slug
      title
      preview
      publishedDate
      labels {
        id
        name
        type
      }
      body {
        document
      }
      tags {
        name
      }
    }
  }
`
