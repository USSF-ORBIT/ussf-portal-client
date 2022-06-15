import { gql } from '@apollo/client'

export const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    announcements(take: 6) {
      id
      title
      body {
        document
      }
      publishedDate
      status
    }
  }
`
