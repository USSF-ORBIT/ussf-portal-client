import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import CustomCollection from './CustomCollection'

type StorybookArgTypes = {
  handleAddBookmark: () => void
  handleRemoveBookmark: () => void
  handleRemoveCollection: () => void
  handleEditCollection: () => void
}

export default {
  title: 'Components/Collections/CustomCollection',
  component: CustomCollection,
  argTypes: {
    handleAddBookmark: { action: 'Add bookmark' },
    handleRemoveBookmark: { action: 'Remove bookmark' },
    handleRemoveCollection: { action: 'Remove collection' },
    handleEditCollection: { action: 'Edit collection' },
  },
  decorators: [
    (Story) => (
      <div className="sfds">
        <Story />
      </div>
    ),
  ],
} as Meta

export const ExampleCustomCollection = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    _id={new ObjectId()}
    title="Example collection"
    bookmarks={[
      {
        _id: new ObjectId(),
        url: '#',
        label: 'Webmail',
        cmsId: 'cmsLink1',
      },
      { _id: new ObjectId(), url: '#', label: 'Custom Link' },
    ]}
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
        url: 'https://google.com',
        label: 'Webmail',
        cmsId: 'cmsId1',
      },
      {
        _id: new ObjectId(),
        url: 'https://mypay.dfas.mil/#/',
        label: 'MyPay',
        cmsId: 'cmsId2',
      },
      {
        _id: new ObjectId(),
        url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
        label: 'vMPF',
        cmsId: 'cmsId3',
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
        url: 'https://google.com',
        label: 'Webmail',
        cmsId: 'cmsId1',
      },
      {
        _id: new ObjectId(),
        url: 'https://mypay.dfas.mil/#/',
        label: 'MyPay',
        cmsId: 'cmsId2',
      },
      {
        _id: new ObjectId(),
        url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
        label: 'vMPF',
        cmsId: 'cmsId3',
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
