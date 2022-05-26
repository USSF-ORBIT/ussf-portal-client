import * as Types from '../../../graphql.g'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type AddCollectionMutationVariables = Types.Exact<{
  title: Types.Scalars['String']
  bookmarks: Array<Types.BookmarkInput> | Types.BookmarkInput
}>

export type AddCollectionMutation = {
  __typename?: 'Mutation'
  addCollection?: {
    __typename?: 'Collection'
    _id: any
    title: string
    bookmarks?: Array<{
      __typename?: 'Bookmark'
      _id: any
      url: string
      label?: string | null
      cmsId?: string | null
    } | null> | null
  } | null
}

export const AddCollectionDocument = gql`
  mutation addCollection($title: String!, $bookmarks: [BookmarkInput!]!) {
    addCollection(title: $title, bookmarks: $bookmarks) {
      _id
      title
      bookmarks {
        _id
        url
        label
        cmsId
      }
    }
  }
`
export type AddCollectionMutationFn = Apollo.MutationFunction<
  AddCollectionMutation,
  AddCollectionMutationVariables
>

/**
 * __useAddCollectionMutation__
 *
 * To run a mutation, you first call `useAddCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCollectionMutation, { data, loading, error }] = useAddCollectionMutation({
 *   variables: {
 *      title: // value for 'title'
 *      bookmarks: // value for 'bookmarks'
 *   },
 * });
 */
export function useAddCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCollectionMutation,
    AddCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddCollectionMutation,
    AddCollectionMutationVariables
  >(AddCollectionDocument, options)
}
export type AddCollectionMutationHookResult = ReturnType<
  typeof useAddCollectionMutation
>
export type AddCollectionMutationResult =
  Apollo.MutationResult<AddCollectionMutation>
export type AddCollectionMutationOptions = Apollo.BaseMutationOptions<
  AddCollectionMutation,
  AddCollectionMutationVariables
>
