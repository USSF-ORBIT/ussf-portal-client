import { gql, useQuery } from '@apollo/client'
import type { Collection } from 'types'

export interface CollectionsQueryResponse {
  collections: Collection[]
}

export const GET_KEYSTONE_COLLECTIONS = gql`
  query GetKeystoneCollections {
    collections {
      id
      title
      bookmarks {
        id
        url
        label
      }
    }
  }
`

export function useCollectionsQuery() {
  return useQuery<CollectionsQueryResponse>(GET_KEYSTONE_COLLECTIONS)
}
