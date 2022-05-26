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
