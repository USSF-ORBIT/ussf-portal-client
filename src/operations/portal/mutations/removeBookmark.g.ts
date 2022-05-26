import * as Types from '../../../graphql.g'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type RemoveBookmarkMutationVariables = Types.Exact<{
  _id: Types.Scalars['OID']
  collectionId: Types.Scalars['OID']
  cmsId?: Types.InputMaybe<Types.Scalars['ID']>
}>

export type RemoveBookmarkMutation = {
  __typename?: 'Mutation'
  removeBookmark?: { __typename?: 'Bookmark'; _id: any } | null
}

export const RemoveBookmarkDocument = gql`
  mutation removeBookmark($_id: OID!, $collectionId: OID!, $cmsId: ID) {
    removeBookmark(_id: $_id, collectionId: $collectionId, cmsId: $cmsId) {
      _id
    }
  }
`
export type RemoveBookmarkMutationFn = Apollo.MutationFunction<
  RemoveBookmarkMutation,
  RemoveBookmarkMutationVariables
>

/**
 * __useRemoveBookmarkMutation__
 *
 * To run a mutation, you first call `useRemoveBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBookmarkMutation, { data, loading, error }] = useRemoveBookmarkMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      collectionId: // value for 'collectionId'
 *      cmsId: // value for 'cmsId'
 *   },
 * });
 */
export function useRemoveBookmarkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveBookmarkMutation,
    RemoveBookmarkMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveBookmarkMutation,
    RemoveBookmarkMutationVariables
  >(RemoveBookmarkDocument, options)
}
export type RemoveBookmarkMutationHookResult = ReturnType<
  typeof useRemoveBookmarkMutation
>
export type RemoveBookmarkMutationResult =
  Apollo.MutationResult<RemoveBookmarkMutation>
export type RemoveBookmarkMutationOptions = Apollo.BaseMutationOptions<
  RemoveBookmarkMutation,
  RemoveBookmarkMutationVariables
>
