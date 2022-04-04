import { ObjectId } from 'mongodb'

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
