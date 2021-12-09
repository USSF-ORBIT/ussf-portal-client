import { getCollectionsMock } from './getCollection'
import { ADD_COLLECTION } from 'operations/mutations/addCollection'
import { ADD_COLLECTIONS } from 'operations/mutations/addCollections'
import { ADD_BOOKMARK } from 'operations/mutations/addBookmark'
import { cmsBookmarksMock } from './cmsBookmarks'
import { cmsCollectionsMock } from './cmsCollections'

export let collectionAdded = false
export let bookmarkAdded = false
export let collectionsAdded = false

export const sitesAndAppsMock = [
  ...getCollectionsMock,
  {
    request: {
      query: ADD_COLLECTION,
      variables: {
        title: '',
        bookmarks: [
          {
            cmsId: cmsBookmarksMock[0].id,
            url: cmsBookmarksMock[0].url,
            label: cmsBookmarksMock[0].label,
          },
        ],
      },
    },
    result: () => {
      collectionAdded = true

      return {
        data: {
          addCollection: {
            _id: '100',
            title: '',
            bookmarks: [
              {
                _id: '101',
                cmsId: cmsBookmarksMock[0].id,
                url: cmsBookmarksMock[0].url,
                label: cmsBookmarksMock[0].label,
              },
            ],
          },
        },
      }
    },
  },
  {
    request: {
      query: ADD_COLLECTIONS,
      variables: {
        collections: cmsCollectionsMock,
      },
    },
    result: () => {
      collectionsAdded = true
      return {
        data: {
          addCollections: cmsCollectionsMock.map((c) => ({
            _id: '100' + c.id,
            title: c.title,
            bookmarks: c.bookmarks.map((b) => ({
              _id: '101' + b.id,
              cmsId: b.id,
              url: b.url,
              label: b.label,
            })),
          })),
        },
      }
    },
  },
  {
    request: {
      query: ADD_BOOKMARK,
      variables: {
        collectionId: getCollectionsMock[0].result.data.collections[0]._id,
        cmsId: cmsBookmarksMock[0].id,
        url: cmsBookmarksMock[0].url,
        label: cmsBookmarksMock[0].label,
        id: cmsBookmarksMock[0].id,
      },
    },
    result: () => {
      bookmarkAdded = true
      return {
        data: {
          addBookmark: {
            _id: '101',
            cmsId: cmsBookmarksMock[0].id,
            url: cmsBookmarksMock[0].url,
            label: cmsBookmarksMock[0].label,
          },
        },
      }
    },
  },
]
