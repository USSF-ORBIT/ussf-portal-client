import { gql } from 'graphql-tag'
import type { Collection } from 'types'

export interface CollectionsQueryResponse {
  collections: Collection[]
}

export const GET_KEYSTONE_COLLECTIONS = gql`
  query GetKeystoneCollections {
    collections(where: { showInSitesApps: { equals: true } }) {
      id
      title
      bookmarks {
        id
        url
        label
        description
      }
    }
  }
`
