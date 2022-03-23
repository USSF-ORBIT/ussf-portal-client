import { ObjectId } from 'mongodb'

export const exampleCollection1 = {
  _id: `${ObjectId()}`,
  title: 'Example Collection',
  type: 'Collection',
  bookmarks: [
    {
      _id: `${ObjectId()}`,
      url: 'https://google.com',
      label: 'Webmail',
      cmsId: null,
      isRemoved: null,
    },
    {
      _id: `${ObjectId()}`,
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      cmsId: null,
      isRemoved: null,
    },
    {
      _id: `${ObjectId()}`,
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      cmsId: null,
      isRemoved: null,
    },
    {
      _id: `${ObjectId()}`,
      url: 'https://leave.af.mil/profile',
      label: 'LeaveWeb',
      cmsId: null,
      isRemoved: null,
    },
    {
      _id: `${ObjectId()}`,
      url: 'https://www.e-publishing.af.mil/',
      label: 'e-Publications',
      cmsId: null,
      isRemoved: null,
    },
  ],
}

export const exampleCollection2 = {
  _id: `${ObjectId()}`,
  title: 'Second Collection',
  type: 'Collection',
  bookmarks: [
    {
      _id: `${ObjectId()}`,
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
