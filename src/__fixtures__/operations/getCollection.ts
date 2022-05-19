import { ObjectId } from 'mongodb'
import { GetCollectionsDocument } from 'generated/graphql'

export const getCollectionsMock = [
  {
    request: {
      query: GetCollectionsDocument,
    },
    result: {
      data: {
        collections: [
          {
            _id: ObjectId(),
            title: 'Example Collection',
            type: 'Collection',
            bookmarks: [
              {
                _id: ObjectId(),
                url: 'https://google.com',
                label: 'Webmail',
                cmsId: null,
                isRemoved: null,
              },
              {
                _id: ObjectId(),
                url: 'https://mypay.dfas.mil/#/',
                label: 'MyPay',
                cmsId: '1',
                isRemoved: null,
              },
              {
                _id: ObjectId(),
                url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
                label: 'vMPF',
                cmsId: '2',
                isRemoved: null,
              },
            ],
          },
          {
            _id: ObjectId(),
            title: 'Maxed Out Collection',
            type: 'Collection',
            bookmarks: Array.from({ length: 10 }, (x, i) => ({
              _id: ObjectId(),
              label: `Bookmark ${i}`,
              url: '#',
              isRemoved: null,
              cmsId: `${i}`,
            })),
          },
          ...Array.from({ length: 20 }, (x, i) => ({
            _id: ObjectId(),
            title: `Collection ${i + 3}`,
            type: 'Collection',
            bookmarks: [],
          })),
        ],
      },
    },
  },
]

const mockCollection = {
  title: 'Example Collection',
  type: 'Collection',
  bookmarks: [
    {
      _id: ObjectId(),
      url: 'https://google.com',
      label: 'Webmail',
      cmsId: null,
      isRemoved: null,
    },
  ],
}

const maxCollections = Array.from({ length: 25 }, () => {
  return {
    ...mockCollection,
    _id: ObjectId(),
  }
})

export const getMaximumCollectionsMock = [
  {
    request: {
      query: GetCollectionsDocument,
    },
    result: {
      data: {
        collections: maxCollections,
      },
    },
  },
]
