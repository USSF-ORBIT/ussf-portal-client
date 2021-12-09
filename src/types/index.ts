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
}

// When creating a new Bookmark, the _id must be type ObjectId
export type BookmarkInput = {
  _id: ObjectId
  url: string
  label?: string
  cmsId?: string
}

/* Collection refers to a user-created collection containing one or more bookmarks */

export type Collection = {
  _id: string
  title: string
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
  isBeta: boolean
}

export type SessionUser = SAMLUser & {
  userId: string
}
