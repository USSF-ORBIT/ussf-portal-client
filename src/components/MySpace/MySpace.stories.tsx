import React from 'react'
import { Meta } from '@storybook/react'

import MySpace from './MySpace'
import { GET_MY_SPACE } from 'operations/queries/getMySpace'

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

const exampleMySpaceData = [
  {
    __typename: 'Collection',
    _id: '1',
    title: 'Example Collection',
    type: 'Collection',
    bookmarks: [
      {
        _id: '1',
        url: 'https://google.com',
        label: 'Webmail',
        cmsId: 'a',
        isRemoved: false,
      },
      {
        _id: '2',
        url: 'https://mypay.dfas.mil/#/',
        label: 'MyPay',
        cmsId: 'b',
        isRemoved: false,
      },
      {
        _id: '3',
        url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
        label: 'vMPF',
        cmsId: null,
        isRemoved: false,
      },
    ],
  },
  {
    __typename: 'NewsWidget',
    _id: '2',
    title: 'Recent News',
    type: 'News',
  },
]

export const ExampleMySpace = () => <MySpace bookmarks={[]} />

ExampleMySpace.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: GET_MY_SPACE,
        },
        result: {
          data: {
            mySpace: exampleMySpaceData,
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
          query: GET_MY_SPACE,
        },
        result: {
          data: {},
        },
      },
    ],
  },
}
