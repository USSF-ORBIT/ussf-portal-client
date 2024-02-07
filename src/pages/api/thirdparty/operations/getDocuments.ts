import { gql } from 'graphql-tag'

export const GET_DOCUMENTS = gql`
  query getDocuments {
    documents {
      id
      title
      description
      file {
        filename
        filesize
        url
      }
    }
  }
`
