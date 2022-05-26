import * as Types from '../../../graphql.g'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type RemoveWidgetMutationVariables = Types.Exact<{
  _id: Types.Scalars['OID']
}>

export type RemoveWidgetMutation = {
  __typename?: 'Mutation'
  removeWidget?:
    | { __typename?: 'Collection'; _id: any }
    | { __typename?: 'NewsWidget'; _id: any }
    | null
}

export const RemoveWidgetDocument = gql`
  mutation removeWidget($_id: OID!) {
    removeWidget(_id: $_id) {
      _id
    }
  }
`
export type RemoveWidgetMutationFn = Apollo.MutationFunction<
  RemoveWidgetMutation,
  RemoveWidgetMutationVariables
>

/**
 * __useRemoveWidgetMutation__
 *
 * To run a mutation, you first call `useRemoveWidgetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveWidgetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeWidgetMutation, { data, loading, error }] = useRemoveWidgetMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useRemoveWidgetMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveWidgetMutation,
    RemoveWidgetMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveWidgetMutation,
    RemoveWidgetMutationVariables
  >(RemoveWidgetDocument, options)
}
export type RemoveWidgetMutationHookResult = ReturnType<
  typeof useRemoveWidgetMutation
>
export type RemoveWidgetMutationResult =
  Apollo.MutationResult<RemoveWidgetMutation>
export type RemoveWidgetMutationOptions = Apollo.BaseMutationOptions<
  RemoveWidgetMutation,
  RemoveWidgetMutationVariables
>
