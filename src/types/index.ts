export type Bookmark = {
  id: string
  url: string
  label?: string
  description?: string
}

export type BookmarkRecords = readonly Partial<Bookmark>[]

export type Collection = {
  id: string
  title: string
  bookmarks: Bookmark[]
}

export type CollectionRecords = readonly Partial<Collection>[]
