import { gql } from 'graphql-tag'

export const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements($publishedDate: DateTime) {
    announcements(
      take: 5
      where: {
        status: { equals: Published }
        publishedDate: { lte: $publishedDate }
      }
      orderBy: [{ publishedDate: desc }]
    ) {
      id
      title
      body {
        document(hydrateRelationships: true)
      }
      publishedDate
      status
    }
  }
`
