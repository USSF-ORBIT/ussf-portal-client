import { gql, useQuery } from '@apollo/client'

export const GET_COUNT = gql`
  query {
    postsCount
  }
`

export function usePostsCountQuery() {
  return useQuery(GET_COUNT, {
    context: {
      clientName: 'cms',
    },
  })
}
