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
      cmsId: 'cktd7hjz30636w5977vu4la4c',
    },
    {
      _id: new ObjectId(),
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      description: 'Lorem ipsum',
      cmsId: 'cktd7c0d30190w597qoftevq1',
    },
    {
      _id: new ObjectId(),
      url: 'https://leave.af.mil/profile',
      label: 'LeaveWeb',
      description: 'Lorem ipsum',
      cmsId: 'cktd7ettn0457w597p7ja4uye',
    },
    {
      _id: new ObjectId(),
      url: 'https://mypers.af.mil',
      label: 'EPRs/OPRs',
      description: 'Lorem ipsum',
      cmsId: 'cktd7anq40068w597xloypsez',
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
