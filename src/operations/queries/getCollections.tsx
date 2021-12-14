import { gql, useQuery } from '@apollo/client'
import type { Collection } from 'types'

export interface CollectionsQueryResponse {
  collections: Collection[]
}
export const GET_COLLECTIONS = gql`
  query getCollections {
    collections {
      _id
      title
      bookmarks {
        _id
        url
        label
        cmsId
        isRemoved
      }
    }
  }
`

export function useCollectionsQuery() {
  return useQuery<CollectionsQueryResponse>(GET_COLLECTIONS)
}
