import { GET_MY_SPACE } from 'operations/queries/getMySpace'

export const getMySpaceMock = [
  {
    request: {
      query: GET_MY_SPACE,
    },
    result: {
      data: {
        mySpace: [
          {
            __typename: 'Collection',
            _id: '1',
            title: 'Example Collection',
            type: 'Collection',
            bookmarks: [
              {
                _id: '3',
                url: 'https://google.com',
                label: 'Webmail',
                cmsId: null,
                isRemoved: null,
              },
              {
                _id: '4',
                url: 'https://mypay.dfas.mil/#/',
                label: 'MyPay',
                cmsId: '1',
                isRemoved: null,
              },
              {
                _id: '5',
                url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
                label: 'vMPF',
                cmsId: '2',
                isRemoved: null,
              },
            ],
          },
          {
            __typename: 'Collection',
            _id: '2',
            title: 'Maxed Out Collection',
            type: 'Collection',
            bookmarks: Array.from({ length: 10 }, (x, i) => ({
              _id: `${i}`,
              label: `Bookmark ${i}`,
              url: '#',
              isRemoved: null,
              cmsId: `${i}`,
            })),
          },
          {
            __typename: 'NewsWidget',
            _id: '3',
            title: 'Recent News',
            type: 'News',
          },
          ...Array.from({ length: 20 }, (x, i) => ({
            __typename: 'Collection',
            _id: `${i + 4}`,
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
      _id: '3',
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
    _id: `${i}`,
  }
})

export const getMySpaceMaximumCollectionsMock = [
  {
    request: {
      query: GET_MY_SPACE,
    },
    result: {
      data: {
        mySpace: maxCollections,
      },
    },
  },
]
