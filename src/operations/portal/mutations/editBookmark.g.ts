import * as Types from '../../../graphql.g'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type EditBookmarkMutationVariables = Types.Exact<{
  _id: Types.Scalars['OID']
  collectionId: Types.Scalars['OID']
  label?: Types.InputMaybe<Types.Scalars['String']>
  url?: Types.InputMaybe<Types.Scalars['String']>
}>

export type EditBookmarkMutation = {
  __typename?: 'Mutation'
  editBookmark?: {
    __typename?: 'Bookmark'
    _id: any
    label?: string | null
    url: string
  } | null
}

export const EditBookmarkDocument = gql`
  mutation editBookmark(
    $_id: OID!
    $collectionId: OID!
    $label: String
    $url: String
  ) {
    editBookmark(
      _id: $_id
      collectionId: $collectionId
      label: $label
      url: $url
    ) {
      _id
      label
      url
    }
  }
`
export type EditBookmarkMutationFn = Apollo.MutationFunction<
  EditBookmarkMutation,
  EditBookmarkMutationVariables
>

/**
 * __useEditBookmarkMutation__
 *
 * To run a mutation, you first call `useEditBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editBookmarkMutation, { data, loading, error }] = useEditBookmarkMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      collectionId: // value for 'collectionId'
 *      label: // value for 'label'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useEditBookmarkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditBookmarkMutation,
    EditBookmarkMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    EditBookmarkMutation,
    EditBookmarkMutationVariables
  >(EditBookmarkDocument, options)
}
export type EditBookmarkMutationHookResult = ReturnType<
  typeof useEditBookmarkMutation
>
export type EditBookmarkMutationResult =
  Apollo.MutationResult<EditBookmarkMutation>
export type EditBookmarkMutationOptions = Apollo.BaseMutationOptions<
  EditBookmarkMutation,
  EditBookmarkMutationVariables
>
