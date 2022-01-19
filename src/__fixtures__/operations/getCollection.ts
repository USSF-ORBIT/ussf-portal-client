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
            _id: '34',
            title: 'Example Collection',
            bookmarks: [
              {
                _id: '3',
                url: 'https://google.com',
                label: 'Webmail',
                description: 'Lorem ipsum',
                cmsId: null,
                isRemoved: null,
              },
              {
                _id: '4',
                url: 'https://mypay.dfas.mil/#/',
                label: 'MyPay',
                description: 'Lorem ipsum',
                cmsId: '1',
                isRemoved: null,
              },
              {
                _id: '5',
                url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
                label: 'vMPF',
                description: 'Lorem ipsum',
                cmsId: '2',
                isRemoved: null,
              },
            ],
          },
        ],
      },
    },
  },
]

const mockCollection = {
  title: 'Example Collection',
  bookmarks: [
    {
      _id: '3',
      url: 'https://google.com',
      label: 'Webmail',
      description: 'Lorem ipsum',
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
