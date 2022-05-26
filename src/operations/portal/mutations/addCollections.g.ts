import * as Types from '../../../graphql.g'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type AddCollectionsMutationVariables = Types.Exact<{
  collections: Array<Types.CollectionRecordInput> | Types.CollectionRecordInput
}>

export type AddCollectionsMutation = {
  __typename?: 'Mutation'
  addCollections?: Array<{
    __typename?: 'Collection'
    _id: any
    cmsId?: string | null
    title: string
    type: Types.WidgetType
    bookmarks?: Array<{
      __typename?: 'Bookmark'
      _id: any
      cmsId?: string | null
      url: string
      label?: string | null
    } | null> | null
  } | null> | null
}

export const AddCollectionsDocument = gql`
  mutation addCollections($collections: [CollectionRecordInput!]!) {
    addCollections(collections: $collections) {
      _id
      cmsId
      title
      type
      bookmarks {
        _id
        cmsId
        url
        label
      }
    }
  }
`
export type AddCollectionsMutationFn = Apollo.MutationFunction<
  AddCollectionsMutation,
  AddCollectionsMutationVariables
>

/**
 * __useAddCollectionsMutation__
 *
 * To run a mutation, you first call `useAddCollectionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCollectionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCollectionsMutation, { data, loading, error }] = useAddCollectionsMutation({
 *   variables: {
 *      collections: // value for 'collections'
 *   },
 * });
 */
export function useAddCollectionsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCollectionsMutation,
    AddCollectionsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddCollectionsMutation,
    AddCollectionsMutationVariables
  >(AddCollectionsDocument, options)
}
export type AddCollectionsMutationHookResult = ReturnType<
  typeof useAddCollectionsMutation
>
export type AddCollectionsMutationResult =
  Apollo.MutationResult<AddCollectionsMutation>
export type AddCollectionsMutationOptions = Apollo.BaseMutationOptions<
  AddCollectionsMutation,
  AddCollectionsMutationVariables
>
