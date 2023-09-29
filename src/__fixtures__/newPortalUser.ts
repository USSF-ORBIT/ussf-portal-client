import { ObjectId } from 'mongodb'
import { exampleWeatherWidget2 } from './data/weatherWidgets'
import { CollectionRecord, MySpaceWidget } from 'types/index'

// The ExampleCollection in Keystone used to initialize new users
export const exampleCollection: CollectionRecord = {
  id: 'ckwz3u58s1835ql974leo1yll',
  title: 'Example Collection',
  bookmarks: [
    {
      id: 'cktd7c0d30190w597qoftevq1',
      url: 'https://afpcsecure.us.af.mil/',
      label: 'vMPF',
    },
    {
      id: 'cktd7ettn0457w597p7ja4uye',
      url: 'https://leave.af.mil/profile',
      label: 'LeaveWeb',
    },
    {
      id: 'cktd7hjz30636w5977vu4la4c',
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
    },
    {
      id: 'ckwz3tphw1763ql97pia1zkvc',
      url: 'https://webmail.apps.mil/',
      label: 'Webmail',
    },
    {
      id: 'ckwz3u4461813ql970wkd254m',
      url: 'https://www.e-publishing.af.mil/',
      label: 'e-Publications',
    },
  ],
}

// Test collections that already exist on a User record in mongo
export const exampleCollection1: MySpaceWidget = {
  _id: ObjectId(),
  title: 'Example Collection',
  type: 'Collection',
  bookmarks: [
    {
      _id: ObjectId(),
      url: 'https://google.com',
      label: 'Webmail',
      cmsId: 'cmsId1',
      isRemoved: null,
    },
    {
      _id: ObjectId(),
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      cmsId: 'cmsId2',
      isRemoved: null,
    },
    {
      _id: ObjectId(),
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      cmsId: 'cmsId3',
      isRemoved: null,
    },
    {
      _id: ObjectId(),
      url: 'https://leave.af.mil/profile',
      label: 'LeaveWeb',
      cmsId: 'cmsId4',
      isRemoved: null,
    },
    {
      _id: ObjectId(),
      url: 'https://www.e-publishing.af.mil/',
      label: 'e-Publications',
      cmsId: 'cmsId5',
      isRemoved: null,
    },
    {
      _id: ObjectId(),
      url: 'https://example.com',
      label: 'Custom Bookmark',
      cmsId: null,
      isRemoved: null,
    },
  ],
}

export const exampleCollection2: MySpaceWidget = {
  _id: ObjectId(),
  title: 'Second Collection',
  type: 'Collection',
  bookmarks: [
    {
      _id: ObjectId(),
      url: 'https://google.com',
      label: 'Search Engine',
      cmsId: null,
      isRemoved: null,
    },
  ],
}

export const newPortalUser = {
  userId: 'BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil',
  mySpace: [
    exampleCollection1,
    exampleCollection2,
    exampleWeatherWidget2 as MySpaceWidget,
  ],
  displayName: 'BERNADETTE CAMPBELL',
  theme: 'dark',
}
