// eslint-disable-next-line
const { ObjectId } = require('mongodb')

const exampleCollection1 = {
  title: 'Example Collection',
  _id: new ObjectId(),
  type: 'Collection',
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
  type: 'Collection',
  bookmarks: [
    {
      _id: new ObjectId(),
      url: 'https://google.com',
      label: 'Search Engine',
      description: 'Lorem ipsum',
    },
  ],
}

const exampleCollection3 = {
  title: 'Third Collection',
  _id: new ObjectId(),
  type: 'Collection',
  bookmarks: [
    {
      _id: new ObjectId(),
      url: 'https://google.com',
      label: 'Search Engine',
      description: 'Lorem ipsum',
    },
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
  ],
}

module.exports.testUser1 = {
  userId: 'TEST.USER.1234567890@testusers.cce.af.mil',
  mySpace: [exampleCollection1, exampleCollection2],
}

module.exports.testUser2 = {
  userId: 'SECOND.TESTER.1234567890@testusers.cce.af.mil',
  mySpace: [exampleCollection3],
}
