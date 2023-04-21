import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import { testUser1 } from '../../__fixtures__/authUsers'
import MySpace from './MySpace'
import { mockRssFeedTwo } from '__mocks__/news-rss'
import { SPACEFORCE_NEWS_RSS_URL } from 'constants/index'
import { AuthContext } from 'stores/authContext'
import { Collection } from 'types'
import { cmsBookmarksMock } from '__fixtures__/data/cmsBookmarks'

// Load 2 items
const RSS_URL = `${SPACEFORCE_NEWS_RSS_URL}&max=2`

const mockNewsWidget: any = {
  _id: new ObjectId(),
  title: 'Recent News',
  type: 'News',
}

const exampleMySpaceData: Collection[] = [
  {
    _id: new ObjectId(),
    title: 'Example Collection',
    type: 'Collection',
    bookmarks: [
      {
        _id: new ObjectId(),
        url: 'www.example.com/1',
        label: 'MyVector',
        cmsId: '1',
        isRemoved: false,
      },
      {
        _id: new ObjectId(),
        url: 'www.example.com/2',
        label: 'SURF',
        cmsId: '2',
        isRemoved: false,
      },
      {
        _id: new ObjectId(),
        url: 'www.example.com/3',
        label: 'Orders',
        cmsId: '3',
      },
      {
        _id: new ObjectId(),
        url: 'www.example.com/4',
        label: 'Custom Link',
        cmsId: null,
      },
    ],
  },
  mockNewsWidget,
]

const examplePortalUser = {
  userId: 'BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil',
  mySpace: exampleMySpaceData,
  displayName: 'BERNIE',
  theme: 'light',
}

const mockContext = {
  user: testUser1,
  portalUser: examplePortalUser,
  setUser: () => {
    return
  },
  setPortalUser: () => {
    return
  },
  logout: () => {
    return
  },
  login: () => {
    return
  },
}

export default {
  title: 'Layouts/My Space',
  component: MySpace,
  decorators: [
    (Story) => (
      <AuthContext.Provider value={mockContext}>
        <div className="sfds">
          <Story />
        </div>
      </AuthContext.Provider>
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

export const ExampleMySpace = () => <MySpace bookmarks={cmsBookmarksMock} />
