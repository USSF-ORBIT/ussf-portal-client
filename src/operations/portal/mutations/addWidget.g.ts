import * as Types from '../../../graphql.g'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type AddWidgetMutationVariables = Types.Exact<{
  title: Types.Scalars['String']
  type: Types.WidgetType
}>

export type AddWidgetMutation = {
  __typename?: 'Mutation'
  addWidget?:
    | {
        __typename?: 'Collection'
        _id: any
        title: string
        type: Types.WidgetType
      }
    | {
        __typename?: 'NewsWidget'
        _id: any
        title: string
        type: Types.WidgetType
      }
    | null
}

export const AddWidgetDocument = gql`
  mutation addWidget($title: String!, $type: WidgetType!) {
    addWidget(title: $title, type: $type) {
      _id
      title
      type
    }
  }
`
export type AddWidgetMutationFn = Apollo.MutationFunction<
  AddWidgetMutation,
  AddWidgetMutationVariables
>

/**
 * __useAddWidgetMutation__
 *
 * To run a mutation, you first call `useAddWidgetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWidgetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWidgetMutation, { data, loading, error }] = useAddWidgetMutation({
 *   variables: {
 *      title: // value for 'title'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useAddWidgetMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddWidgetMutation,
    AddWidgetMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddWidgetMutation, AddWidgetMutationVariables>(
    AddWidgetDocument,
    options
  )
}
export type AddWidgetMutationHookResult = ReturnType<
  typeof useAddWidgetMutation
>
export type AddWidgetMutationResult = Apollo.MutationResult<AddWidgetMutation>
export type AddWidgetMutationOptions = Apollo.BaseMutationOptions<
  AddWidgetMutation,
  AddWidgetMutationVariables
>
