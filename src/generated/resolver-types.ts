import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
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
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
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
  bookmarks?: InputMaybe<Array<InputMaybe<BookmarkRecord>>>
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
  mySpace: Array<Widget>
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

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Bookmark: ResolverTypeWrapper<Bookmark>
  BookmarkInput: BookmarkInput
  BookmarkRecord: BookmarkRecord
  BookmarkRecordInput: BookmarkRecordInput
  BookmarkReorderInput: BookmarkReorderInput
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Collection: ResolverTypeWrapper<Collection>
  CollectionRecord: CollectionRecord
  CollectionRecordInput: CollectionRecordInput
  ID: ResolverTypeWrapper<Scalars['ID']>
  Mutation: ResolverTypeWrapper<{}>
  NewsWidget: ResolverTypeWrapper<NewsWidget>
  OID: ResolverTypeWrapper<Scalars['OID']>
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']>
  Widget: ResolversTypes['Collection'] | ResolversTypes['NewsWidget']
  WidgetType: WidgetType
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Bookmark: Bookmark
  BookmarkInput: BookmarkInput
  BookmarkRecord: BookmarkRecord
  BookmarkRecordInput: BookmarkRecordInput
  BookmarkReorderInput: BookmarkReorderInput
  Boolean: Scalars['Boolean']
  Collection: Collection
  CollectionRecord: CollectionRecord
  CollectionRecordInput: CollectionRecordInput
  ID: Scalars['ID']
  Mutation: {}
  NewsWidget: NewsWidget
  OID: Scalars['OID']
  Query: {}
  String: Scalars['String']
  Widget:
    | ResolversParentTypes['Collection']
    | ResolversParentTypes['NewsWidget']
}

export type BookmarkResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Bookmark'] = ResolversParentTypes['Bookmark']
> = {
  _id?: Resolver<ResolversTypes['OID'], ParentType, ContextType>
  cmsId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  isRemoved?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CollectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']
> = {
  _id?: Resolver<ResolversTypes['OID'], ParentType, ContextType>
  bookmarks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Bookmark']>>>,
    ParentType,
    ContextType
  >
  cmsId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['WidgetType'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  addBookmark?: Resolver<
    Maybe<ResolversTypes['Bookmark']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddBookmarkArgs, 'collectionId' | 'url'>
  >
  addCollection?: Resolver<
    Maybe<ResolversTypes['Collection']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddCollectionArgs, 'bookmarks' | 'title'>
  >
  addCollections?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Collection']>>>,
    ParentType,
    ContextType,
    Partial<MutationAddCollectionsArgs>
  >
  addWidget?: Resolver<
    Maybe<ResolversTypes['Widget']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddWidgetArgs, 'title' | 'type'>
  >
  editBookmark?: Resolver<
    Maybe<ResolversTypes['Bookmark']>,
    ParentType,
    ContextType,
    RequireFields<MutationEditBookmarkArgs, '_id' | 'collectionId'>
  >
  editCollection?: Resolver<
    Maybe<ResolversTypes['Collection']>,
    ParentType,
    ContextType,
    RequireFields<MutationEditCollectionArgs, '_id'>
  >
  removeBookmark?: Resolver<
    Maybe<ResolversTypes['Bookmark']>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveBookmarkArgs, '_id' | 'collectionId'>
  >
  removeCollection?: Resolver<
    Maybe<ResolversTypes['Collection']>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCollectionArgs, '_id'>
  >
  removeWidget?: Resolver<
    Maybe<ResolversTypes['Widget']>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveWidgetArgs, '_id'>
  >
}

export type NewsWidgetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['NewsWidget'] = ResolversParentTypes['NewsWidget']
> = {
  _id?: Resolver<ResolversTypes['OID'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['WidgetType'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface OidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['OID'], any> {
  name: 'OID'
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  collections?: Resolver<
    Maybe<Array<ResolversTypes['Collection']>>,
    ParentType,
    ContextType
  >
  mySpace?: Resolver<Array<ResolversTypes['Widget']>, ParentType, ContextType>
}

export type WidgetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Widget'] = ResolversParentTypes['Widget']
> = {
  __resolveType: TypeResolveFn<
    'Collection' | 'NewsWidget',
    ParentType,
    ContextType
  >
  _id?: Resolver<ResolversTypes['OID'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['WidgetType'], ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Bookmark?: BookmarkResolvers<ContextType>
  Collection?: CollectionResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  NewsWidget?: NewsWidgetResolvers<ContextType>
  OID?: GraphQLScalarType
  Query?: QueryResolvers<ContextType>
  Widget?: WidgetResolvers<ContextType>
}
