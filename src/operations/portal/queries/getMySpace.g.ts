import * as Types from '../../../graphql.g'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetMySpaceQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetMySpaceQuery = {
  __typename?: 'Query'
  mySpace?: Array<
    | {
        __typename?: 'Collection'
        _id: any
        title: string
        type: Types.WidgetType
        bookmarks?: Array<{
          __typename?: 'Bookmark'
          _id: any
          url: string
          label?: string | null
          cmsId?: string | null
          isRemoved?: boolean | null
        } | null> | null
      }
    | {
        __typename?: 'NewsWidget'
        _id: any
        title: string
        type: Types.WidgetType
      }
  > | null
}

export const GetMySpaceDocument = gql`
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

/**
 * __useGetMySpaceQuery__
 *
 * To run a query within a React component, call `useGetMySpaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMySpaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMySpaceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMySpaceQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMySpaceQuery,
    GetMySpaceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMySpaceQuery, GetMySpaceQueryVariables>(
    GetMySpaceDocument,
    options
  )
}
export function useGetMySpaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMySpaceQuery,
    GetMySpaceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMySpaceQuery, GetMySpaceQueryVariables>(
    GetMySpaceDocument,
    options
  )
}
export type GetMySpaceQueryHookResult = ReturnType<typeof useGetMySpaceQuery>
export type GetMySpaceLazyQueryHookResult = ReturnType<
  typeof useGetMySpaceLazyQuery
>
export type GetMySpaceQueryResult = Apollo.QueryResult<
  GetMySpaceQuery,
  GetMySpaceQueryVariables
>
