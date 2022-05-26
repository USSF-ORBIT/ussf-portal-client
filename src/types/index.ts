import type { ObjectId } from 'bson'

// #TODO add comments for any remaining types; what is this for, how are we using it?
// any types only being used for graphql operations can be deleted

/**
 * ***********************
 * Portal GraphQL Types
 * ***********************
 * */
export * from '../../generated/graphql'
/**
 * ***********************
 * Types for Keystone Data
 * ***********************
 * */

/* BookmarkRecord refers to canonical bookmarks created and managed in CMS */

export type BookmarkRecord = {
  id: string
  url: string
  label?: string
  description?: string
}

export type BookmarkRecords = BookmarkRecord[]

/* CollectionRecord refers to canonical collections created and managed in CMS */

export type CollectionRecord = {
  id: string
  title: string
  bookmarks: BookmarkRecords
}
export type CollectionRecords = readonly CollectionRecord[]

/**
 * ***********************
 * Types for Portal Data
 * ***********************
 * */

export type WidgetType = 'Collection' | 'News'

export type Widget = {
  _id: ObjectId
  title: string
  type: WidgetType
}

export type MySpaceWidget = Widget | Collection
export type MySpace = MySpaceWidget[]

/* Bookmark refers to a user-created object containing a url */
export type Bookmark = {
  _id: ObjectId
  url: string
  label?: string
  cmsId?: string
  isRemoved?: boolean
}

// When creating a new empty collection, we need to initialize an empty bookmark with no _id
// When creating a new collection from a single bookmark, we need to initialize with no_id *and* a cmsId
export type NewBookmarkInput = {
  url: string
  label?: string
  cmsId?: string
}

// When creating a new Bookmark, the _id must be type ObjectId
export type BookmarkInput = {
  _id: ObjectId
  url: string
  label?: string
  cmsId?: string
}

export type RemovedBookmark = {
  _id: ObjectId
}

/* Collection refers to a user-created collection containing one or more bookmarks */
export interface Collection extends Widget {
  bookmarks: Bookmark[]
  cmsId?: string
  type: 'Collection'
}

export type NewCollectionInput = {
  title: string
  bookmarks: BookmarkInput[]
}

export type CollectionInput = {
  _id: ObjectId
  title: string
  bookmarks: BookmarkInput[]
  type: 'Collection'
}

export type CollectionsInput = {
  _id: ObjectId
  title: string
  bookmarks: BookmarkInput[]
}

export type CollectionRecordInput = Pick<
  CollectionRecord,
  'id' | 'title' | 'bookmarks'
>

export type BookmarkRecordInput = Pick<BookmarkRecord, 'id' | 'url' | 'label'>

/**
 * ***********************
 * Types for User / Auth
 * ***********************
 * */
export interface SAMLUser {
  issuer: string
  nameID: string
  nameIDFormat: string
  inResponseTo: string
  sessionIndex: string
  attributes: {
    subject: string
    edipi: string
    common_name: string
    fascn: string
    givenname: string
    surname: string
    userprincipalname: string
    userGroups: string[]
  }
}

export type PortalUser = {
  userId: string
  mySpace: Collection[]
}

export type SessionUser = SAMLUser & {
  userId: string
}

/**
 * ***********************
 * Types for News articles
 * ***********************
 * */

export type RSSNewsItem = {
  id?: string
  desc?: string
  date?: string
  link?: string
  title?: string
  image?: string
}

export type NewsListItemArticle = {
  id: string
  thumbnailSrc?: string
  publishDate?: string
  title: string
  description: string
  source: string
  sourceName: string
  sourceLink: string
}
