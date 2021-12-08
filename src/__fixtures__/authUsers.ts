import type { SessionUser } from 'types'

export const testUser1: SessionUser = {
  userId: 'TEST.USER.1234567890@testusers.cce.af.mil',
  issuer: 'http://localhost:8080/simplesaml/saml2/idp/metadata.php',
  nameID: '_9c9d48b40112e0d39413d937f9d3a940420d719fbb',
  nameIDFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
  inResponseTo: '_82bc4c3df3d7396a9f22',
  sessionIndex: '_b0674f313b122aad2ce1faccac204e732e57b2740b',
  attributes: {
    edipi: '1540897553',
    givenname: 'Test',
    surname: 'User',
    userprincipalname: 'TEST.USER.1234567890@testusers.cce.af.mil',
    ivgroups: 'AFIN_TRANSIT,AF_USERS',
    subject:
      '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=USER.TEST.1540897553',
  },
}
