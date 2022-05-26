import * as Types from '../../../graphql.g'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetCollectionsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetCollectionsQuery = {
  __typename?: 'Query'
  collections?: Array<{
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
  }> | null
}

export const GetCollectionsDocument = gql`
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

/**
 * __useGetCollectionsQuery__
 *
 * To run a query within a React component, call `useGetCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCollectionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCollectionsQuery,
    GetCollectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCollectionsQuery, GetCollectionsQueryVariables>(
    GetCollectionsDocument,
    options
  )
}
export function useGetCollectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCollectionsQuery,
    GetCollectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCollectionsQuery, GetCollectionsQueryVariables>(
    GetCollectionsDocument,
    options
  )
}
export type GetCollectionsQueryHookResult = ReturnType<
  typeof useGetCollectionsQuery
>
export type GetCollectionsLazyQueryHookResult = ReturnType<
  typeof useGetCollectionsLazyQuery
>
export type GetCollectionsQueryResult = Apollo.QueryResult<
  GetCollectionsQuery,
  GetCollectionsQueryVariables
>
