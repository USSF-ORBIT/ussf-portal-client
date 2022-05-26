import * as Types from '../../../graphql.g'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type RemoveCollectionMutationVariables = Types.Exact<{
  _id: Types.Scalars['OID']
}>

export type RemoveCollectionMutation = {
  __typename?: 'Mutation'
  removeCollection?: { __typename?: 'Collection'; _id: any } | null
}

export const RemoveCollectionDocument = gql`
  mutation removeCollection($_id: OID!) {
    removeCollection(_id: $_id) {
      _id
    }
  }
`
export type RemoveCollectionMutationFn = Apollo.MutationFunction<
  RemoveCollectionMutation,
  RemoveCollectionMutationVariables
>

/**
 * __useRemoveCollectionMutation__
 *
 * To run a mutation, you first call `useRemoveCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCollectionMutation, { data, loading, error }] = useRemoveCollectionMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useRemoveCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveCollectionMutation,
    RemoveCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveCollectionMutation,
    RemoveCollectionMutationVariables
  >(RemoveCollectionDocument, options)
}
export type RemoveCollectionMutationHookResult = ReturnType<
  typeof useRemoveCollectionMutation
>
export type RemoveCollectionMutationResult =
  Apollo.MutationResult<RemoveCollectionMutation>
export type RemoveCollectionMutationOptions = Apollo.BaseMutationOptions<
  RemoveCollectionMutation,
  RemoveCollectionMutationVariables
>
