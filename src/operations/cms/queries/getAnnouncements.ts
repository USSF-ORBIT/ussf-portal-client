import { gql } from '@apollo/client'

export const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    announcements(
      take: 5
      where: { status: { equals: Published } }
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
