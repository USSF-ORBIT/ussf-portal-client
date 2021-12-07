// eslint-disable-next-line
const { ObjectId } = require('mongodb')

const exampleCollection1 = {
  title: 'Example Collection',
  _id: new ObjectId(),
  bookmarks: [
    {
      _id: new ObjectId(),
      url: 'https://google.com',
      label: 'Webmail',
      description: 'Lorem ipsum',
    },
    {
      _id: new ObjectId(),
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      description: 'Lorem ipsum',
    },
    {
      _id: new ObjectId(),
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      description: 'Lorem ipsum',
    },
    {
      _id: new ObjectId(),
      url: 'https://leave.af.mil/profile',
      label: 'LeaveWeb',
      description: 'Lorem ipsum',
    },
    {
      _id: new ObjectId(),
      url: 'https://www.e-publishing.af.mil/',
      label: 'e-Publications',
      description: 'Lorem ipsum',
    },
  ],
}

const exampleCollection2 = {
  title: 'Second Collection',
  _id: new ObjectId(),
  bookmarks: [
    {
      _id: new ObjectId(),
      url: 'https://google.com',
      label: 'Search Engine',
      description: 'Lorem ipsum',
    },
  ],
}

export const testUser = {
  commonName: 'TEST.USER.1234567890@testusers.cce.af.mil',
  isBeta: true,
  mySpace: [exampleCollection1, exampleCollection2],
}

// TODO - add a second user, log in & test they have their own myspace
