import { gql, useQuery } from '@apollo/client'
import type { MySpace } from 'types'

export interface MySpaceQueryResponse {
  mySpace: MySpace
}

export const GET_MY_SPACE = gql`
  query getMySpace {
    mySpace {
      _id
      title
      type
      ... on Collection {
        bookmarks {
          _id
          url
          label
          cmsId
          isRemoved
        }
      }
    }
  }
`

export function useMySpaceQuery() {
  return useQuery<MySpaceQueryResponse>(GET_MY_SPACE)
}
