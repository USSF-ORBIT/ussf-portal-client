import { ObjectId } from 'mongodb'
import { CollectionRecord } from 'types/index'

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

// Weather widgets
export const exampleWeatherWidget1 = {
  _id: ObjectId(),
  title: 'Weather',
  type: 'Weather',
  coords: {
    lat: 34.0901,
    long: -118.4065,
    forecastUrl: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast',
    hourlyForecastUrl:
      'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
    city: 'Beverly Hills',
    state: 'CA',
    zipcode: '90210',
  },
}
export const exampleWeatherWidget2 = {
  _id: ObjectId(),
  title: 'Weather',
  type: 'Weather',
  coords: {
    lat: 54.143,
    long: -165.7854,
    forecastUrl: 'https://api.weather.gov/gridpoints/ALU/509,77/forecast',
    hourlyForecastUrl:
      'https://api.weather.gov/gridpoints/ALU/509,77/forecast/hourly',
    city: 'Akutan',
    state: 'AK',
    zipcode: '99553',
  },
}

export const newPortalUser = {
  userId: 'CAMPBELL.BERNADETTE.5244446289',
  mySpace: [exampleCollection1, exampleCollection2, exampleWeatherWidget1],
  displayName: 'BERNADETTE CAMPBELL',
  theme: 'dark',
}
