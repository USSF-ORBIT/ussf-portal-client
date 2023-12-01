import { gql } from 'graphql-tag'

export const GET_CNOTES = gql`
  query GetCNotes($publishedDate: DateTime) {
    articles(
      where: {
        status: { equals: Published }
        publishedDate: { lte: $publishedDate }
        category: { equals: InternalNews }
        tags: { some: { name: { equals: "C-Note" } } }
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
