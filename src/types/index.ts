import type { ObjectId } from 'bson'

/**
 * ***********************
 * Portal GraphQL Types
 * ***********************
 * */
export * from '../graphql.g'

/**
 * *****************************
 * Types for Keystone Data (CMS)
 * *****************************
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

/* Document field (JSON) content types*/
type Text = {
  text: string
  [key: string]: unknown
}

type Node = Element | Text

type Element = {
  children: Node[]
  [key: string]: unknown
}

/* ArticleListItemRecord is used when querying multiple articles from the CMS */
export type ArticleListItemRecord = {
  id: string
  slug?: string
  title: string
  preview: string
  publishedDate: string
  source?: string
  sourceName?: string
  sourceLink?: string
  labels?: LabelRecord[]
}

/* ArticleRecord is the complete article used when viewing the single article page */
export type ArticleRecord = {
  id: string
  slug: string
  title: string
  publishedDate: string
  body: {
    document: Element[]
  }
}

/* LabelRecord is a label managed by the CMS */
export type LabelRecord = {
  id: string
  name: string
  type: 'Source' | 'Audience' | 'Base'
}

/* Search Results (from Keystone) */
export type SearchResultType = 'Article' | 'Bookmark'

export type SearchResultRecord = {
  id: string
  type: SearchResultType // 'Article' | 'Bookmark'
  title: string // Article.title or Bookmark.label
  preview: string // Article.preview or Bookmark.description
  permalink: string // Article.slug or Bookmark.url
  date?: string // Article.publishedDate
  labels?: LabelRecord[] // Article.labels { id name type }
}

/**
 * *****************************
 * Types for Portal Data
 * *****************************
 * */

/*  WidgetType is stored in MongoDB to identify the type of widget  */
export type WidgetType = 'Collection' | 'News'

/*  Widget refers to an existing widget in MongoDB, created and managed in a user's MySpace */
export type Widget = {
  _id: ObjectId
  title: string
  type: WidgetType
}

/*  BookmarkModelInput represents a bookmark as it is passed into MongoDB for updating  */
export type BookmarkModelInput = {
  _id: ObjectId
  url: string
  label?: string
  cmsId?: string
}
/*  Bookmark refers to an existing user-created object as it is stored in MongoDB 
    It has the addition of isRemoved, which is used to determine if the bookmark is deleted or hidden */
export type Bookmark = {
  _id: ObjectId
  url: string
  label?: string
  cmsId?: string
  isRemoved?: boolean
}

/*  Collection refers to a user-created collection containing one or more bookmarks
    It represents both the input and result of creating and retrieving a collection from MongoDB  */
export interface Collection extends Widget {
  bookmarks: Bookmark[]
  cmsId?: string
  type: 'Collection'
}

/*  MySpaceWidget represents a user's MySpace and is used when displaying their content */
export type MySpaceWidget = Widget | Collection
export type MySpace = MySpaceWidget[]

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
  displayName: string
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
  publishDate: string
  title: string
  description: string
  source: string
  sourceName: string
  sourceLink: string
}

/**
 * ***********************
 * Types for Announcements
 * ***********************
 * */

export type AnnouncementRecord = {
  id: string
  title: string
  body: {
    document: Element[]
  }
  status: string
  publishedDate: string
}
