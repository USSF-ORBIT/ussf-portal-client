import { ObjectId } from 'mongodb'

export const exampleCollection1 = {
  _id: new ObjectId(),
  title: 'Example Collection',
  bookmarks: [
    {
      _id: new ObjectId(),
      url: 'https://google.com',
      label: 'Webmail',
      description: 'Lorem ipsum',
      cmsId: null,
      isRemoved: null,
    },
    {
      _id: new ObjectId(),
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      description: 'Lorem ipsum',
      cmsId: null,
      isRemoved: null,
    },
    {
      _id: new ObjectId(),
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      description: 'Lorem ipsum',
      cmsId: null,
      isRemoved: null,
    },
    {
      _id: new ObjectId(),
      url: 'https://leave.af.mil/profile',
      label: 'LeaveWeb',
      description: 'Lorem ipsum',
      cmsId: null,
      isRemoved: null,
    },
    {
      _id: new ObjectId(),
      url: 'https://www.e-publishing.af.mil/',
      label: 'e-Publications',
      description: 'Lorem ipsum',
      cmsId: null,
      isRemoved: null,
    },
  ],
}

export const exampleCollection2 = {
  _id: new ObjectId(),
  title: 'Second Collection',
  bookmarks: [
    {
      _id: new ObjectId(),
      url: 'https://google.com',
      label: 'Search Engine',
      description: 'Lorem ipsum',
      cmsId: null,
      isRemoved: null,
    },
  ],
}

export const newPortalUser = {
  userId: 'HALL.MICHAEL.0123456789',
  isBeta: true,
  mySpace: [exampleCollection1, exampleCollection2],
}
