import { gql, useQuery } from '@apollo/client'
import type { Collection } from 'types'

export interface CollectionsQueryResponse {
  collections: Collection[]
}
export const GET_COLLECTIONS = gql`
  query getCollections @client {
    collections {
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
