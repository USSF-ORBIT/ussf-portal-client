import { ObjectId } from 'bson'
import type { SessionUser, PortalUser } from 'types'

export const testUser1: SessionUser = {
  userId: 'BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil',
  issuer: 'http://localhost:8080/simplesaml/saml2/idp/metadata.php',
  nameID: '_9c9d48b40112e0d39413d937f9d3a940420d719fbb',
  nameIDFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
  inResponseTo: '_82bc4c3df3d7396a9f22',
  sessionIndex: '_b0674f313b122aad2ce1faccac204e732e57b2740b',
  attributes: {
    edipi: '5244446289',
    common_name: 'CAMPBELL.BERNADETTE.5244446289',
    fascn: '5244446289197004',
    givenname: 'BERNADETTE',
    surname: 'CAMPBELL',
    userprincipalname: 'BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil',
    userGroups: ['AF_USERS'],
    subject:
      '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=CAMPBELL.BERNADETTE.5244446289',
  },
}

export const testPortalUser1: PortalUser = {
  userId: 'BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil',
  mySpace: [
    {
      _id: new ObjectId('641dee649934af1088164f20'),
      cmsId: 'ckwz3u58s1835ql974leo1yll',
      title: 'Example Collection',
      type: 'Collection',
      bookmarks: [
        {
          _id: new ObjectId('641dee649934af1088164f21'),
          cmsId: 'cktd7c0d30190w597qoftevq1',
          url: 'https://afpcsecure.us.af.mil/',
          label: 'vMPF',
        },
        {
          _id: new ObjectId('641dee649934af1088164f22'),
          cmsId: 'cktd7ettn0457w597p7ja4uye',
          url: 'https://leave.af.mil/profile',
          label: 'LeaveWeb',
        },
        {
          _id: new ObjectId('641dee649934af1088164f23'),
          cmsId: 'cktd7hjz30636w5977vu4la4c',
          url: 'https://mypay.dfas.mil/#/',
          label: 'MyPay',
        },
        {
          _id: new ObjectId('641dee649934af1088164f24'),
          cmsId: 'ckwz3tphw1763ql97pia1zkvc',
          url: 'https://webmail.apps.mil/',
          label: 'Webmail',
        },
        {
          _id: new ObjectId('641dee649934af1088164f25'),
          cmsId: 'ckwz3u4461813ql970wkd254m',
          url: 'https://www.e-publishing.af.mil/',
          label: 'e-Publications',
        },
      ],
    },
  ],
  displayName: 'BERNADETTE CAMPBELL',
  theme: 'light',
}

export const cmsAdmin = {
  ...testUser1,
  attributes: {
    ...testUser1.attributes,
    userGroups: [...testUser1.attributes.userGroups, 'PORTAL_CMS_Admins'],
  },
}

export const cmsUser = {
  ...testUser1,
  attributes: {
    ...testUser1.attributes,
    userGroups: [...testUser1.attributes.userGroups, 'PORTAL_CMS_Users'],
  },
}
