import * as Types from '../../../graphql.g'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type EditCollectionMutationVariables = Types.Exact<{
  _id: Types.Scalars['OID']
  title: Types.Scalars['String']
  bookmarks?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.BookmarkReorderInput>>
    | Types.InputMaybe<Types.BookmarkReorderInput>
  >
}>

export type EditCollectionMutation = {
  __typename?: 'Mutation'
  editCollection?: {
    __typename?: 'Collection'
    _id: any
    title: string
    bookmarks?: Array<{
      __typename?: 'Bookmark'
      _id: any
      url: string
      label?: string | null
      cmsId?: string | null
      isRemoved?: boolean | null
    } | null> | null
  } | null
}

export const EditCollectionDocument = gql`
  mutation editCollection(
    $_id: OID!
    $title: String!
    $bookmarks: [BookmarkReorderInput]
  ) {
    editCollection(_id: $_id, title: $title, bookmarks: $bookmarks) {
      _id
      title
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
export type EditCollectionMutationFn = Apollo.MutationFunction<
  EditCollectionMutation,
  EditCollectionMutationVariables
>

/**
 * __useEditCollectionMutation__
 *
 * To run a mutation, you first call `useEditCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCollectionMutation, { data, loading, error }] = useEditCollectionMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      title: // value for 'title'
 *      bookmarks: // value for 'bookmarks'
 *   },
 * });
 */
export function useEditCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditCollectionMutation,
    EditCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    EditCollectionMutation,
    EditCollectionMutationVariables
  >(EditCollectionDocument, options)
}
export type EditCollectionMutationHookResult = ReturnType<
  typeof useEditCollectionMutation
>
export type EditCollectionMutationResult =
  Apollo.MutationResult<EditCollectionMutation>
export type EditCollectionMutationOptions = Apollo.BaseMutationOptions<
  EditCollectionMutation,
  EditCollectionMutationVariables
>
