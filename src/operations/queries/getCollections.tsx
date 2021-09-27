import { gql, useQuery } from '@apollo/client'
import type { Collection } from 'types'

export interface CollectionsQueryResponse {
  collections: Collection[]
}
export const GET_COLLECTIONS = gql`
  query GetCollections {
    collections @client {
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

export function useCollectionsQuery() {
  return useQuery<CollectionsQueryResponse>(GET_COLLECTIONS)
}
