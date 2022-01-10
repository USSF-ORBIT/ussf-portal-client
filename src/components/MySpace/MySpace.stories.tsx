import React from 'react'
import { Meta } from '@storybook/react'

import MySpace from './MySpace'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'

export default {
  title: 'Components/My Space',
  component: MySpace,
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

const exampleCollection = [
  {
    _id: '1',
    title: 'Example Collection',
    bookmarks: [
      {
        _id: '1',
        url: 'https://google.com',
        label: 'Webmail',
        description: 'Lorem ipsum',
      },
      {
        _id: '2',
        url: 'https://mypay.dfas.mil/#/',
        label: 'MyPay',
        description: 'Lorem ipsum',
      },
      {
        _id: '3',
        url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
        label: 'vMPF',
        description: 'Lorem ipsum',
      },
    ],
  },
]

export const ExampleMySpace = () => <MySpace bookmarks={[]} />

ExampleMySpace.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: GET_COLLECTIONS,
        },
        result: {
          data: {
            collections: exampleCollection,
          },
        },
      },
    ],
  },
}

export const Loading = () => <MySpace bookmarks={[]} />

Loading.parameters = {
  apolloClient: {
    mocks: [
      {
        delay: 100000000000000,
        request: {
          query: GET_COLLECTIONS,
        },
        result: {
          data: {},
        },
      },
    ],
  },
}
