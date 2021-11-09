import { ObjectId } from 'mongodb'

export type Bookmark = {
  __typename?: string
  _id: ObjectId
  url: string
  label?: string
}

type BookmarkRecord = {
  id: string
  url: string
  label?: string
}

export type BookmarkRecords = readonly BookmarkRecord[]

export type BookmarkInput = {
  url: string
  label?: string
}

export type BookmarkResponse = {
  url: string
  label?: string

  collectionId: string
}

export type Collection = {
  __typename?: string
  _id: string
  title: string
  bookmarks: Bookmark[]
}

export type CollectionInput = {
  _id: ObjectId
  title: string
  bookmarks: Bookmark[]
}

export type CollectionsInput = {
  _id: string
  title: string
  bookmarks: Bookmark[]
}
type CollectionRecord = {
  id: string
  title: string
  bookmarks: BookmarkRecords
}
export type CollectionRecords = readonly CollectionRecord[]
