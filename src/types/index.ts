import type { ObjectId } from 'bson'

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

export type BookmarkRecords = readonly BookmarkRecord[]

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
  _id: string
  title: string
  type: WidgetType
}

export type MySpaceWidget = Widget | Collection
export type MySpace = MySpaceWidget[]

/* Bookmark refers to a user-created object containing a url */
export type Bookmark = {
  _id: string
  url: string
  label?: string
  cmsId?: string
  isRemoved?: boolean
}

// When creating a new collection, we need to initialize an empty bookmark with no ID
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
  _id: string
}

/* Collection refers to a user-created collection containing one or more bookmarks */
export interface Collection extends Widget {
  bookmarks: Bookmark[]
}

export type CollectionInput = {
  _id: ObjectId
  title: string
  bookmarks: BookmarkInput[]
}

export type CollectionsInput = {
  _id: string
  title: string
  bookmarks: BookmarkInput[]
}

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
    givenname: string
    surname: string
    userprincipalname: string
    ivgroups: string
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
