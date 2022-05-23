import { ObjectId } from 'mongodb'
import { GetMySpaceDocument } from '../../../generated/graphql'

const mockNews = {
  __typename: 'NewsWidget',
  _id: ObjectId(),
  title: 'Recent News',
  type: 'News',
}

export const getMySpaceMock = [
  {
    request: {
      query: GetMySpaceDocument,
    },
    result: {
      data: {
        mySpace: [
          {
            __typename: 'Collection',
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
            __typename: 'Collection',
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
          { ...mockNews },
          ...Array.from({ length: 20 }, (x, i) => ({
            __typename: 'Collection',
            _id: ObjectId(),
            title: `Collection ${i + 3}`,
            bookmarks: [],
            type: 'Collection',
          })),
        ],
      },
    },
  },
]

const mockCollection = {
  __typename: 'Collection',
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

const maxCollections = Array.from({ length: 25 }, (x, i) => {
  return {
    ...mockCollection,
    title: 'Example Collection ' + i.toString(),
    _id: ObjectId(),
  }
})

export const getMySpaceMaximumCollectionsMock = [
  {
    request: {
      query: GetMySpaceDocument,
    },
    result: {
      data: {
        mySpace: maxCollections,
      },
    },
  },
]

export const getMySpaceMaximumCollectionsWithNewsMock = [
  {
    request: {
      query: GetMySpaceDocument,
    },
    result: {
      data: {
        mySpace: [...maxCollections, mockNews],
      },
    },
  },
]
