import { ObjectId } from 'bson'

export type Bookmark = {
  __typename?: string
  _id: string
  url: string
  label?: string
  description?: string
}

type BookmarkRecord = Partial<Bookmark> & Pick<Bookmark, '_id'>
export type BookmarkRecords = readonly BookmarkRecord[]

export type Collection = {
  __typename?: string
  _id: string
  title: string
  bookmarks: Bookmark[]
}

type CollectionRecord = Partial<Collection> & Pick<Collection, '_id'>
export type CollectionRecords = readonly CollectionRecord[]
