import { ObjectId } from 'bson'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'

export const getCollectionsMock = [
  {
    request: {
      query: GET_COLLECTIONS,
    },
    result: {
      data: {
        collections: [
          {
            _id: new ObjectId(),
            title: 'Example Collection',
            type: 'Collection',
            bookmarks: [
              {
                _id: new ObjectId(),
                url: 'https://google.com',
                label: 'Webmail',
                cmsId: null,
                isRemoved: null,
              },
              {
                _id: new ObjectId(),
                url: 'https://mypay.dfas.mil/#/',
                label: 'MyPay',
                cmsId: '1',
                isRemoved: null,
              },
              {
                _id: new ObjectId(),
                url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
                label: 'vMPF',
                cmsId: '2',
                isRemoved: null,
              },
            ],
          },
          {
            _id: new ObjectId(),
            title: 'Maxed Out Collection',
            type: 'Collection',
            bookmarks: Array.from({ length: 10 }, (x, i) => ({
              _id: new ObjectId(),
              label: `Bookmark ${i}`,
              url: '#',
              isRemoved: null,
              cmsId: `${i}`,
            })),
          },
          ...Array.from({ length: 20 }, (x, i) => ({
            _id: new ObjectId(),
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
      _id: new ObjectId(),
      url: 'https://google.com',
      label: 'Webmail',
      cmsId: null,
      isRemoved: null,
    },
  ],
}

const maxCollections = Array.from({ length: 25 }, (x, i) => {
  return {
    ...mockCollection,
    _id: new ObjectId(),
  }
})

export const getMaximumCollectionsMock = [
  {
    request: {
      query: GET_COLLECTIONS,
    },
    result: {
      data: {
        collections: maxCollections,
      },
    },
  },
]
