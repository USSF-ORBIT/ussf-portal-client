import { gql } from '@apollo/client'

export const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    announcements {
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
