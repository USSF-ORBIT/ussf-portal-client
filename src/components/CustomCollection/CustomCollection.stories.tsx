import React from 'react'
import { Meta } from '@storybook/react'
import { ObjectId } from 'bson'
import CustomCollection from './CustomCollection'

type StorybookArgTypes = {
  handleAddBookmark: () => void
  handleRemoveBookmark: () => void
  handleRemoveCollection: () => void
  handleEditCollection: () => void
  handleEditBookmark: () => void
}

export default {
  title: 'Components/Sections/Collections/CustomCollection',
  component: CustomCollection,
  argTypes: {
    handleAddBookmark: { action: 'Add bookmark' },
    handleRemoveBookmark: { action: 'Remove bookmark' },
    handleRemoveCollection: { action: 'Remove collection' },
    handleEditCollection: { action: 'Edit collection' },
    handleEditBookmark: { action: 'Edit bookmark' },
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
    _id={new ObjectId('testCollection')}
    title="Example collection"
    bookmarks={[
      {
        _id: new ObjectId('link1'),
        url: '#',
        label: 'Webmail',
        cmsId: 'cmsLink1',
      },
      { _id: new ObjectId('link2'), url: '#', label: 'Custom Link' },
    ]}
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
    handleEditBookmark={argTypes.handleEditBookmark}
  />
)

export const WithNineLinks = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    _id={new ObjectId('testCollection')}
    title="Example collection"
    bookmarks={[
      {
        _id: new ObjectId('1'),
        url: 'https://google.com',
        label: 'Webmail',
        cmsId: 'cmsId1',
      },
      {
        _id: new ObjectId('2'),
        url: 'https://mypay.dfas.mil/#/',
        label: 'MyPay',
        cmsId: 'cmsId2',
      },
      {
        _id: new ObjectId('3'),
        url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
        label: 'vMPF',
        cmsId: 'cmsId3',
      },
      {
        _id: new ObjectId('4'),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId('5'),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId('6'),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId('7'),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId('8'),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId('9'),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
    ]}
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
    handleEditBookmark={argTypes.handleEditBookmark}
  />
)

export const WithTenLinks = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    _id={new ObjectId('testCollection')}
    title="Example collection"
    bookmarks={[
      {
        _id: new ObjectId('1'),
        url: 'https://google.com',
        label: 'Webmail',
        cmsId: 'cmsId1',
      },
      {
        _id: new ObjectId('2'),
        url: 'https://mypay.dfas.mil/#/',
        label: 'MyPay',
        cmsId: 'cmsId2',
      },
      {
        _id: new ObjectId('3'),
        url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
        label: 'vMPF',
        cmsId: 'cmsId3',
      },
      {
        _id: new ObjectId('4'),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId('5'),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId('6'),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId('7'),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId('8'),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId('9'),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
      {
        _id: new ObjectId('10'),
        url: 'https://example.com',
        label: 'My Custom Link',
      },
    ]}
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
    handleEditBookmark={argTypes.handleEditBookmark}
  />
)

export const BlankCustomCollection = (argTypes: StorybookArgTypes) => (
  <CustomCollection
    _id={new ObjectId('testCollection')}
    handleAddBookmark={argTypes.handleAddBookmark}
    handleRemoveBookmark={argTypes.handleRemoveBookmark}
    handleRemoveCollection={argTypes.handleRemoveCollection}
    handleEditCollection={argTypes.handleEditCollection}
    handleEditBookmark={argTypes.handleEditBookmark}
  />
)
