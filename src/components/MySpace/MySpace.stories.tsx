import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import { MySpaceContext, MySpaceContextType } from '../../stores/myspaceContext'
import MySpace from './MySpace'
import { mockRssFeedTwo } from '__mocks__/news-rss'
import { SPACEFORCE_NEWS_RSS_URL } from 'constants/index'
import { Widget } from 'types'
import { cmsBookmarksMock } from '__fixtures__/data/cmsBookmarks'

// Load 2 items
const RSS_URL = `${SPACEFORCE_NEWS_RSS_URL}&max=2`

const mockNewsWidget: Widget = {
  _id: new ObjectId(),
  title: 'Recent News',
  type: 'News',
}

const exampleMySpaceData: Widget[] = [
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
      },
    ],
  },
  mockNewsWidget,
]

const mockMySpaceContext: MySpaceContextType = {
  mySpace: [...exampleMySpaceData],
  disableDragAndDrop: false,
  setDisableDragAndDrop: () => {
    return
  },
  isAddingWidget: false,
  setIsAddingWidget: () => {
    return
  },
  initializeMySpace: () => {
    return
  },
  isCollection: (widget: Widget) => {
    return widget.type === 'Collection'
  },
  isGuardianIdeal: () => {
    return false
  },
  isNewsWidget: (widget: Widget) => {
    return widget.type === 'News'
  },
  isFeaturedShortcuts: () => {
    return false
  },
  isWeather: () => {
    return false
  },
  canAddCollections: true,
  canAddNews: true,
  canAddWeather: true,
  canAddGuardianIdeal: true,
  canAddFeaturedShortcuts: true,
  addNewsWidget: () => {
    return
  },
  addGuardianIdeal: () => {
    return
  },
  addFeaturedShortcuts: () => {
    return
  },
  addNewCollection: () => {
    return
  },
  addNewWeatherWidget: () => {
    return
  },
  editWeatherWidget: () => {
    return
  },
  handleOnDragEnd: () => {
    return
  },
  temporaryWidget: '',
  setTemporaryWidget: () => {
    return
  },
}

export default {
  title: 'Layouts/My Space',
  component: MySpace,
  decorators: [
    (Story) => (
      <MySpaceContext.Provider value={mockMySpaceContext}>
        <Story />
      </MySpaceContext.Provider>
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
