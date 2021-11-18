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
        ],
        'user2:user2pass' => [
            'edipi' => '1234567890',
            'givenname' => 'Second',
            'sans' => 'msupn:1234567890@mil',
            'surname' => 'Tester',
            'userprincipalname' => 'SECOND.TESTER.1234567890@testusers.cce.af.mil',
            'ivgroups' => 'AFIN_TRANSIT,AF_USERS',
        ],
    ],
];