import { ObjectId } from 'mongodb'
import { WIDGET_TYPES } from 'constants/index'
import { Collection } from 'types/index'

export const EXAMPLE_COLLECTION: Collection = {
  _id: ObjectId(),
  cmsId: 'ckwz3u58s1835ql974leo1yll',
  title: 'Example Collection',
  type: WIDGET_TYPES.COLLECTION,
  bookmarks: [
    {
      _id: ObjectId(),
      cmsId: 'cktd7c0d30190w597qoftevq1',
      url: 'https://afpcsecure.us.af.mil/',
      label: 'vMPF',
    },
    {
      _id: ObjectId(),
      cmsId: 'cktd7ettn0457w597p7ja4uye',
      url: 'https://leave.af.mil/profile',
      label: 'LeaveWeb',
    },
    {
      _id: ObjectId(),
      cmsId: 'cktd7hjz30636w5977vu4la4c',
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
    },
    {
      _id: ObjectId(),
      cmsId: 'ckwz3tphw1763ql97pia1zkvc',
      url: 'https://webmail.apps.mil/',
      label: 'Webmail',
    },
    {
      _id: ObjectId(),
      cmsId: 'ckwz3u4461813ql970wkd254m',
      url: 'https://www.e-publishing.af.mil/',
      label: 'e-Publications',
    },
  ],
}
export const exampleCollection1 = {
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

export const exampleCollection2 = {
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
  userId: 'CAMPBELL.BERNADETTE.5244446289',
  mySpace: [exampleCollection1, exampleCollection2],
}
