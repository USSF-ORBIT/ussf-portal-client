import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  OID: any
}

export type Bookmark = {
  __typename?: 'Bookmark'
  _id: Scalars['OID']
  cmsId?: Maybe<Scalars['ID']>
  isRemoved?: Maybe<Scalars['Boolean']>
  label?: Maybe<Scalars['String']>
  url: Scalars['String']
}

export type BookmarkInput = {
  cmsId?: InputMaybe<Scalars['ID']>
  label?: InputMaybe<Scalars['String']>
  url: Scalars['String']
}

export type BookmarkRecord = {
  cmsId?: InputMaybe<Scalars['ID']>
  id: Scalars['ID']
  label?: InputMaybe<Scalars['String']>
  url: Scalars['String']
}

export type BookmarkRecordInput = {
  id: Scalars['ID']
  label?: InputMaybe<Scalars['String']>
  url: Scalars['String']
}

export type BookmarkReorderInput = {
  _id: Scalars['OID']
  cmsId?: InputMaybe<Scalars['ID']>
  isRemoved?: InputMaybe<Scalars['Boolean']>
  label?: InputMaybe<Scalars['String']>
  url: Scalars['String']
}

export type Collection = Widget & {
  __typename?: 'Collection'
  _id: Scalars['OID']
  bookmarks?: Maybe<Array<Maybe<Bookmark>>>
  cmsId?: Maybe<Scalars['ID']>
  title: Scalars['String']
  type: WidgetType
}

export type CollectionRecord = {
  bookmarks: Array<BookmarkRecord>
  id: Scalars['ID']
  title: Scalars['String']
}

export type CollectionRecordInput = {
  bookmarks?: InputMaybe<Array<InputMaybe<BookmarkRecordInput>>>
  id: Scalars['ID']
  title: Scalars['String']
  type?: InputMaybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  addBookmark?: Maybe<Bookmark>
  addCollection?: Maybe<Collection>
  addCollections?: Maybe<Array<Maybe<Collection>>>
  addWidget?: Maybe<Widget>
  editBookmark?: Maybe<Bookmark>
  editCollection?: Maybe<Collection>
  removeBookmark?: Maybe<Bookmark>
  removeCollection?: Maybe<Collection>
  removeWidget?: Maybe<Widget>
}

export type MutationAddBookmarkArgs = {
  cmsId?: InputMaybe<Scalars['ID']>
  collectionId: Scalars['OID']
  label?: InputMaybe<Scalars['String']>
  url: Scalars['String']
}

export type MutationAddCollectionArgs = {
  bookmarks: Array<BookmarkInput>
  title: Scalars['String']
}

export type MutationAddCollectionsArgs = {
  collections?: InputMaybe<Array<CollectionRecordInput>>
}

export type MutationAddWidgetArgs = {
  title: Scalars['String']
  type: WidgetType
}

export type MutationEditBookmarkArgs = {
  _id: Scalars['OID']
  collectionId: Scalars['OID']
  label?: InputMaybe<Scalars['String']>
  url?: InputMaybe<Scalars['String']>
}

export type MutationEditCollectionArgs = {
  _id: Scalars['OID']
  bookmarks?: InputMaybe<Array<InputMaybe<BookmarkReorderInput>>>
  title?: InputMaybe<Scalars['String']>
}

export type MutationRemoveBookmarkArgs = {
  _id: Scalars['OID']
  cmsId?: InputMaybe<Scalars['ID']>
  collectionId: Scalars['OID']
}

export type MutationRemoveCollectionArgs = {
  _id: Scalars['OID']
}

export type MutationRemoveWidgetArgs = {
  _id: Scalars['OID']
}

export type NewsWidget = Widget & {
  __typename?: 'NewsWidget'
  _id: Scalars['OID']
  title: Scalars['String']
  type: WidgetType
}

export type Query = {
  __typename?: 'Query'
  collections?: Maybe<Array<Collection>>
  mySpace?: Maybe<Array<Widget>>
}

export type Widget = {
  _id: Scalars['OID']
  title: Scalars['String']
  type: WidgetType
}

export enum WidgetType {
  Collection = 'Collection',
  News = 'News',
}

export type AddBookmarkMutationVariables = Exact<{
  url: Scalars['String']
  label?: InputMaybe<Scalars['String']>
  collectionId: Scalars['OID']
  cmsId?: InputMaybe<Scalars['ID']>
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

export type AddCollectionMutationVariables = Exact<{
  title: Scalars['String']
  bookmarks: Array<BookmarkInput> | BookmarkInput
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

export type AddCollectionsMutationVariables = Exact<{
  collections: Array<CollectionRecordInput> | CollectionRecordInput
}>

export type AddCollectionsMutation = {
  __typename?: 'Mutation'
  addCollections?: Array<{
    __typename?: 'Collection'
    _id: any
    cmsId?: string | null
    title: string
    type: WidgetType
    bookmarks?: Array<{
      __typename?: 'Bookmark'
      _id: any
      cmsId?: string | null
      url: string
      label?: string | null
    } | null> | null
  } | null> | null
}

export type AddWidgetMutationVariables = Exact<{
  title: Scalars['String']
  type: WidgetType
}>

export type AddWidgetMutation = {
  __typename?: 'Mutation'
  addWidget?:
    | { __typename?: 'Collection'; _id: any; title: string; type: WidgetType }
    | { __typename?: 'NewsWidget'; _id: any; title: string; type: WidgetType }
    | null
}

export type EditBookmarkMutationVariables = Exact<{
  _id: Scalars['OID']
  collectionId: Scalars['OID']
  label?: InputMaybe<Scalars['String']>
  url?: InputMaybe<Scalars['String']>
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

export type EditCollectionMutationVariables = Exact<{
  _id: Scalars['OID']
  title: Scalars['String']
  bookmarks?: InputMaybe<
    Array<InputMaybe<BookmarkReorderInput>> | InputMaybe<BookmarkReorderInput>
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

export type RemoveBookmarkMutationVariables = Exact<{
  _id: Scalars['OID']
  collectionId: Scalars['OID']
  cmsId?: InputMaybe<Scalars['ID']>
}>

export type RemoveBookmarkMutation = {
  __typename?: 'Mutation'
  removeBookmark?: { __typename?: 'Bookmark'; _id: any } | null
}

export type RemoveCollectionMutationVariables = Exact<{
  _id: Scalars['OID']
}>

export type RemoveCollectionMutation = {
  __typename?: 'Mutation'
  removeCollection?: { __typename?: 'Collection'; _id: any } | null
}

export type RemoveWidgetMutationVariables = Exact<{
  _id: Scalars['OID']
}>

export type RemoveWidgetMutation = {
  __typename?: 'Mutation'
  removeWidget?:
    | { __typename?: 'Collection'; _id: any }
    | { __typename?: 'NewsWidget'; _id: any }
    | null
}

export type GetCollectionsQueryVariables = Exact<{ [key: string]: never }>

export type GetCollectionsQuery = {
  __typename?: 'Query'
  collections?: Array<{
    __typename?: 'Collection'
    _id: any
    title: string
    type: WidgetType
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

export type GetMySpaceQueryVariables = Exact<{ [key: string]: never }>

export type GetMySpaceQuery = {
  __typename?: 'Query'
  mySpace?: Array<
    | {
        __typename?: 'Collection'
        _id: any
        title: string
        type: WidgetType
        bookmarks?: Array<{
          __typename?: 'Bookmark'
          _id: any
          url: string
          label?: string | null
          cmsId?: string | null
          isRemoved?: boolean | null
        } | null> | null
      }
    | { __typename?: 'NewsWidget'; _id: any; title: string; type: WidgetType }
  > | null
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
export const GetMySpaceDocument = gql`
  query getMySpace {
    mySpace {
      _id
      title
      type
      ... on Collection {
        bookmarks {
          _id
          url
          label
          cmsId
          isRemoved
        }
      }
    }
  }
`

/**
 * __useGetMySpaceQuery__
 *
 * To run a query within a React component, call `useGetMySpaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMySpaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMySpaceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMySpaceQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMySpaceQuery,
    GetMySpaceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMySpaceQuery, GetMySpaceQueryVariables>(
    GetMySpaceDocument,
    options
  )
}
export function useGetMySpaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMySpaceQuery,
    GetMySpaceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMySpaceQuery, GetMySpaceQueryVariables>(
    GetMySpaceDocument,
    options
  )
}
export type GetMySpaceQueryHookResult = ReturnType<typeof useGetMySpaceQuery>
export type GetMySpaceLazyQueryHookResult = ReturnType<
  typeof useGetMySpaceLazyQuery
>
export type GetMySpaceQueryResult = Apollo.QueryResult<
  GetMySpaceQuery,
  GetMySpaceQueryVariables
>
