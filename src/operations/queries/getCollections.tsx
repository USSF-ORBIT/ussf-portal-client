import { gql, useQuery } from '@apollo/client'
import type { Collection } from 'types'

export interface CollectionsQueryResponse {
  collections: Collection[]
}
export const GET_COLLECTIONS = gql`
  query getCollections {
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
  console.log('Use Collections Queryyyy')
  return useQuery<CollectionsQueryResponse>(GET_COLLECTIONS)
}
