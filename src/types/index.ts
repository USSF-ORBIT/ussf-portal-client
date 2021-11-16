export type Bookmark = {
  __typename?: string
  id: string
  url: string
  label?: string
  description?: string
}

type BookmarkRecord = Partial<Bookmark> & Pick<Bookmark, 'id'>
export type BookmarkRecords = readonly BookmarkRecord[]

export type Collection = {
  __typename?: string
  id: string
  title: string
  bookmarks: Bookmark[]
}

type CollectionRecord = Partial<Collection> & Pick<Collection, 'id'>
export type CollectionRecords = readonly CollectionRecord[]

export type SAMLUser = {
  nameID: string
  nameIDFormat: string
  attributes: {
    edipi: string
    givenname: string
    sans: string
    surname: string
    userprincipalname: string
    ivgroups: string
  }
}
