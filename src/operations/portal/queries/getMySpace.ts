import { gql, useQuery } from '@apollo/client'
import { GetMySpaceQuery } from '../../../generated/graphql'

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
  return useQuery<GetMySpaceQuery>(GET_MY_SPACE)
}
