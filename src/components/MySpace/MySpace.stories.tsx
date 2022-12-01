import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import MySpace from './MySpace'
import { mockRssFeedTwo } from '__mocks__/news-rss'
import { GetMySpaceDocument } from 'operations/portal/queries/getMySpace.g'
import { SPACEFORCE_NEWS_RSS_URL } from 'constants/index'

// Load 2 items
const RSS_URL = `${SPACEFORCE_NEWS_RSS_URL}&max=2`

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
  parameters: {
    mockData: [
      {
        url: RSS_URL,
        method: 'GET',
        status: 200,
        response: () => {
          return mockRssFeedTwo
        },
      },
    ],
  },
} as Meta

const exampleMySpaceData = [
  {
    __typename: 'Collection',
    _id: new ObjectId().toHexString(),
    title: 'Example Collection',
    type: 'Collection',
    bookmarks: [
      {
        _id: new ObjectId().toHexString(),
        url: 'https://google.com',
        label: 'Webmail',
        cmsId: 'a',
        isRemoved: false,
      },
      {
        _id: new ObjectId().toHexString(),
        url: 'https://mypay.dfas.mil/#/',
        label: 'MyPay',
        cmsId: 'b',
        isRemoved: false,
      },
      {
        _id: new ObjectId().toHexString(),
        url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
        label: 'vMPF',
        cmsId: null,
        isRemoved: false,
      },
    ],
  },
  {
    __typename: 'NewsWidget',
    _id: new ObjectId().toHexString(),
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
