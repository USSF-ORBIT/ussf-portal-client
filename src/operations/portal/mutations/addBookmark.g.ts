import * as Types from '../../../graphql.g'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type AddBookmarkMutationVariables = Types.Exact<{
  url: Types.Scalars['String']
  label?: Types.InputMaybe<Types.Scalars['String']>
  collectionId: Types.Scalars['OID']
  cmsId?: Types.InputMaybe<Types.Scalars['ID']>
}>

export type AddBookmarkMutation = {
  __typename?: 'Mutation'
  addBookmark?: {
    __typename?: 'Bookmark'
    _id: any
    url: string
    label?: string | null
    cmsId?: string | null
  } | null
}

export const AddBookmarkDocument = gql`
  mutation addBookmark(
    $url: String!
    $label: String
    $collectionId: OID!
    $cmsId: ID
  ) {
    addBookmark(
      url: $url
      label: $label
      collectionId: $collectionId
      cmsId: $cmsId
    ) {
      _id
      url
      label
      cmsId
    }
  }
`
export type AddBookmarkMutationFn = Apollo.MutationFunction<
  AddBookmarkMutation,
  AddBookmarkMutationVariables
>

/**
 * __useAddBookmarkMutation__
 *
 * To run a mutation, you first call `useAddBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookmarkMutation, { data, loading, error }] = useAddBookmarkMutation({
 *   variables: {
 *      url: // value for 'url'
 *      label: // value for 'label'
 *      collectionId: // value for 'collectionId'
 *      cmsId: // value for 'cmsId'
 *   },
 * });
 */
export function useAddBookmarkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddBookmarkMutation,
    AddBookmarkMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddBookmarkMutation, AddBookmarkMutationVariables>(
    AddBookmarkDocument,
    options
  )
}
export type AddBookmarkMutationHookResult = ReturnType<
  typeof useAddBookmarkMutation
>
export type AddBookmarkMutationResult =
  Apollo.MutationResult<AddBookmarkMutation>
export type AddBookmarkMutationOptions = Apollo.BaseMutationOptions<
  AddBookmarkMutation,
  AddBookmarkMutationVariables
>
