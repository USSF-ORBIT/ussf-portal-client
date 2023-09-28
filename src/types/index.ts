import type { ObjectId } from 'bson'
import WeatherAPI from '../pages/api/dataSources/weather'
import KeystoneAPI from '../pages/api/dataSources/keystone'
import PersonnelAPI from '../pages/api/dataSources/personnel'
/**
 * ***********************
 * Portal GraphQL Types
 * ***********************
 * */
export * from '../graphql.g'

export interface ServerContext {
  db: {
    collection: (collectionName: string) => {
      findOne: (query: { _id: ObjectId }) => Promise<PortalUser | null>
      updateOne: (
        query: { _id: ObjectId },
        update: { $set: Partial<PortalUser> }
      ) => Promise<void>
    }
  }
  user: SessionUser | null
  dataSources: {
    keystoneAPI: KeystoneAPI
    weatherAPI: WeatherAPI
    personnelAPI: PersonnelAPI
  }
}
/**
 * *****************************
 * Types for Keystone Data (CMS)
 * *****************************
 * */

/* CMSBookmark refers to canonical bookmarks created and managed in CMS */
export type CMSBookmark = {
  id: string
  url: string
  label?: string
  description?: string
}

/* CollectionRecord refers to canonical collections created and managed in CMS */
export type CollectionRecord = {
  id: string
  title: string
  bookmarks: CMSBookmark[]
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

/* IdealListItem is used for the Guardian Ideals */
export type IdealListItem = {
  id: string
  title: string
  body: string
  publishedDate: string
  labels?: LabelRecord[]
  hero?: {
    url: string
  }
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
  hero?: {
    url: string
  }
}

/* PublishableItemType is any item that has publishedDate and status */
export type PublishableItemType = {
  publishedDate: string
  status: 'Draft' | 'Published' | 'Archived'
}

/* ArticleRecord is the complete article used when viewing the single article page */
export type ArticleRecord = PublishableItemType & {
  id: string
  slug: string
  title: string
  category: string
  hero?: {
    url: string
  }
  body: {
    document: Element[]
  }
  byline?: {
    name: string
  }
  labels?: LabelRecord[]
  location?: {
    name: string
  }
  tags?: {
    id: string
    name: string
  }[]
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

/* Single Document is a type displayed on the Documents Page */
export type DocumentType = {
  id: string
  title: string
  file: {
    url: string
  }
  createdAt?: string
  updatedAt?: string
}
/* Document Section can contain Documents */
export type DocumentSectionType = {
  id: string
  title: string
  document: DocumentType[]
  createdAt?: string
  updatedAt?: string
}

/* Document Page can contain Document Sections */
export type DocumentPageType = {
  id: string
  pageTitle: string
  sections: DocumentSectionType[]
  createdAt?: string
  updatedAt?: string
}

/**
 * *****************************
 * Types for Portal Data
 * *****************************
 * */

/* WidgetInputType is used when creating a new user and adding default widgets */
export type WidgetInputType = {
  title: string
  type: WidgetType
}
/*  WidgetType is stored in MongoDB to identify the type of widget  */
export type WidgetType =
  | 'Collection'
  | 'GuardianIdeal'
  | 'News'
  | 'FeaturedShortcuts'
  | 'Weather'

export type WeatherCoords = {
  lat: number
  long: number
  forecastUrl: string
  hourlyForecastUrl: string
  zipcode: string
  city: string
  state: string
}

/*  Widget refers to an existing widget in MongoDB, created and managed in a user's MySpace */
export type Widget = {
  _id: ObjectId
  title: string
  type: WidgetType
  // Added this because the bookmarks field is required on the Collection interface below, but
  // previously did not exist on the Widget type, which was causing a type error when trying to
  // map over the user's MySpace to render the widgets.
  bookmarks?: MongoBookmark[]
  // default indicates if the widget is automatically added for the user
  default?: boolean
  // id is needed for dnd-kit to be able to sort the widgets while a user is dragging. It only needs
  // to exist on a draggable widget in a users MySpace, and is set on all widgets in the initializeMySpace
  // function in myspaceContext. It is not being used anywhere else and does not exist on our GraohQL schema,
  // so when we perform operations on the widget in MongoDB, the value is not used.
  // Additional info: I discovered that we can just use w._id.toString() in handleOnDragEnd in myspaceContext
  // when updating the positioning of widgets, so this value is not being used in any functions. However, in
  // order for the drag-and-drop animation to work, this value needs to exist on the widget in the MySpace.
  id?: string
}

/*  BookmarkModelInput represents a bookmark as it is passed into MongoDB for updating  */
export type BookmarkModelInput = {
  _id: ObjectId
  url: string
  label?: string
  cmsId?: string | null
}

/*  MongoBookmark refers to an existing bookmark as it is stored in MongoDB. This includes
    both user-created bookmarks and bookmarks that the user has added from the CMS.  */
export type MongoBookmark = {
  _id: ObjectId
  url: string
  label?: string
  cmsId?: string | null
  isRemoved?: boolean | null
}

/*  Collection refers to a user-created collection containing one or more bookmarks
    It represents both the input and result of creating and retrieving a collection from MongoDB  */
export interface Collection extends Widget {
  bookmarks: MongoBookmark[]
  cmsId?: string
  type: 'Collection'
}

/* Weather represents the weather widget */
export interface WeatherWidget extends Widget {
  coords: WeatherCoords
}

/*  MySpaceWidget represents a user's MySpace and is used when displaying their content */
export type MySpaceWidget = Widget | Collection | WeatherWidget
export type MySpace = MySpaceWidget[]

/* Featured Shortcut Items represents items appearing in Featured Shortcuts widget */
export type featuredShortcutItem = {
  title: string
  icon: string
  url: string
}

export type featuredShortcutItems = featuredShortcutItem[]

export type SingleGraphQLResponse<ResponseData> = {
  body: {
    kind: 'single'
    singleResult: {
      data: ResponseData
      errors?: {
        message: string
        extensions: {
          code: string
        }
      }[]
    }
  }
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
  mySpace: (Widget | Collection)[]
  displayName: string
  theme: string
}

export type SessionUser = SAMLUser & {
  userId: string
  personnelData: PersonnelData
}

export type PersonnelData = {
  First_name: string
  Last_Name: string
  DOD_ID: string
  Grade: string
  MAJCOM: string
  DUTYTITLE: string
  Country: string
  BASE_LOC: string
  Org_type: string
  EOPDate: string
  userType: string
  lastModifiedAt: string
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

export type NewsItemArticle = {
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
