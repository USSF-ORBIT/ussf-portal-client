<?php

/**
 * @file
 * Used to define the test SAML user accounts.
 */

$config = [
    'admin' => [
        'core:AdminPassword',
    ],
    'example-userpass' => [
        'exampleauth:UserPass',
        'user1:user1pass' => [
            'edipi' => '1540897553',
            'givenname' => 'Test',
            'sans' => 'msupn:1234567890@mil',
            'surname' => 'User',
            'userprincipalname' => 'TEST.USER.1234567890@testusers.cce.af.mil',
            'ivgroups' => 'AFIN_TRANSIT,AF_USERS',
            'subject' => '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=USER.TEST.1540897553'
        ],
        'user2:user2pass' => [
            'edipi' => '1234567890',
            'givenname' => 'Second',
            'sans' => 'msupn:1234567890@mil',
            'surname' => 'Tester',
            'userprincipalname' => 'SECOND.TESTER.1234567890@testusers.cce.af.mil',
            'ivgroups' => 'AFIN_TRANSIT,AF_USERS',
            'subject' => '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=TESTER.SECOND.1234567890'
        ],
        'user3:user3pass' => [
            'edipi' => '1112223334',
            'givenname' => 'CMS',
            'sans' => 'msupn:1112223334@mil',
            'surname' => 'Admin',
            'userprincipalname' => 'CMS.ADMIN.1112223334@testusers.cce.af.mil',
            'ivgroups' => 'USSF_CMS_ADMIN',
            'subject' => '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=ADMIN.CMS.1112223334'
        ],
        'user4:user4pass' => [
            'edipi' => '1112223335',
            'givenname' => 'CMS',
            'sans' => 'msupn:1112223335@mil',
            'surname' => 'User',
            'userprincipalname' => 'CMS.USER.1112223335@testusers.cce.af.mil',
            'ivgroups' => 'USSF_CMS_USERS',
            'subject' => '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=USER.CMS.1112223335'
        ],
    ],
];