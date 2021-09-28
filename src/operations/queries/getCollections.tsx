import { gql, useQuery } from '@apollo/client'
import type { Collection } from 'types'

export interface CollectionsQueryResponse {
  collections: Collection[]
}
export const GET_COLLECTIONS = gql`
  query Collections @client {
    collections {
      id
      title
      bookmarks @client {
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
