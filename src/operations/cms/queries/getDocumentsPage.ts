import { gql } from '@apollo/client'

export const GET_DOCUMENTS_PAGE = gql`
  query getDocumentsPage {
    documentsPages {
      id
      pageTitle
      sections {
        id
        title
        document {
          title
          file {
            url
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
