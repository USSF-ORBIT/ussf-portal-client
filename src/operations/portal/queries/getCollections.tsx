import { gql, useQuery } from '@apollo/client'
import type { GetCollectionsQuery } from 'generated/graphql'

export const GET_COLLECTIONS = gql`
  query getCollections {
    collections {
      _id
      title
      type
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
  return useQuery<GetCollectionsQuery>(GET_COLLECTIONS)
}
