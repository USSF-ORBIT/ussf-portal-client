import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import MySpace from './MySpace'
import { GetMySpaceDocument } from 'operations/portal/queries/getMySpace.g'

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
    _id: new ObjectId(),
    title: 'Example Collection',
    type: 'Collection',
    bookmarks: [
      {
        _id: new ObjectId(),
        url: 'https://google.com',
        label: 'Webmail',
        cmsId: 'a',
        isRemoved: false,
      },
      {
        _id: new ObjectId(),
        url: 'https://mypay.dfas.mil/#/',
        label: 'MyPay',
        cmsId: 'b',
        isRemoved: false,
      },
      {
        _id: new ObjectId(),
        url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
        label: 'vMPF',
        cmsId: null,
        isRemoved: false,
      },
    ],
  },
  {
    __typename: 'NewsWidget',
    _id: new ObjectId(),
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
          query: GetMySpaceDocument,
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
          query: GetMySpaceDocument,
        },
        result: {
          data: {},
        },
      },
    ],
  },
}
