import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import CustomCollection from './CustomCollection'
import { cmsBookmarksMock } from '__fixtures__/data/cmsBookmarks'

type StorybookArgTypes = {
  handleAddBookmark: () => void
  handleRemoveBookmark: () => void
  handleRemoveCollection: () => void
  handleEditCollection: () => void
}

const firstTenCMSBookmarks = cmsBookmarksMock.slice(0, 10)

export default {
  title: 'Components/Collections/CustomCollection',
  component: CustomCollection,
  argTypes: {
    handleAddBookmark: { action: 'Add bookmark' },
    handleRemoveBookmark: { action: 'Remove bookmark' },
    handleRemoveCollection: { action: 'Remove collection' },
    handleEditCollection: { action: 'Edit collection' },
  },
} as Meta

export const ExampleCustomCollection = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    _id={new ObjectId()}
    title="Example collection"
    bookmarks={[
      {
        _id: new ObjectId(),
        url: 'www.example.com/1',
        label: 'MyVector',
        cmsId: '1',
      },
      { _id: new ObjectId(), url: '#', label: 'Custom Link' },
    ]}
    bookmarkOptions={firstTenCMSBookmarks}
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
  />
)

export const WithNineLinks = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    _id={new ObjectId()}
    title="Example collection"
    bookmarks={[
      {
        _id: new ObjectId(),
        url: 'www.example.com/1',
        label: 'MyVector',
        cmsId: '1',
      },
      {
        _id: new ObjectId(),
        url: 'www.example.com/2',
        label: 'SURF',
        cmsId: '2',
      },
      {
        _id: new ObjectId(),
        url: 'www.example.com/3',
        label: 'Orders',
        cmsId: '3',
      },
      {
        _id: new ObjectId(),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId(),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId(),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId(),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId(),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId(),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
    ]}
    bookmarkOptions={firstTenCMSBookmarks}
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
  />
)

export const WithTenLinks = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    _id={new ObjectId()}
    title="Example collection"
    bookmarks={[
      {
        _id: new ObjectId(),
        url: 'www.example.com/1',
        label: 'MyVector',
        cmsId: '1',
      },
      {
        _id: new ObjectId(),
        url: 'www.example.com/2',
        label: 'SURF',
        cmsId: '2',
      },
      {
        _id: new ObjectId(),
        url: 'www.example.com/3',
        label: 'Orders',
        cmsId: '3',
      },
      {
        _id: new ObjectId(),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId(),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId(),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId(),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId(),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId(),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId(),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
    ]}
    bookmarkOptions={firstTenCMSBookmarks}
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
  />
)

export const BlankCustomCollection = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    _id={new ObjectId()}
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
  />
)
