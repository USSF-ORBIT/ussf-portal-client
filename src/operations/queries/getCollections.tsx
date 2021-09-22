import { gql, useQuery } from '@apollo/client'
import type { Collection } from 'types'

interface CollectionsQueryReponse {
  collections: Collection[]
}
export const GET_COLLECTIONS = gql`
  query getCollections($id: ID) @client {
    collections(id: $id) @client {
      id
      title
      bookmarks
    }
  }
`

export function useCollectionsQuery(id?: string) {
  return useQuery<CollectionsQueryReponse>(GET_COLLECTIONS, {
    variables: { id: id },
  })
}
