export type Bookmark = {
  id: string
  url: string
  label?: string
  description?: string
}

export type Collection = {
  id: string
  title: string
  bookmarks: Bookmark[]
}
