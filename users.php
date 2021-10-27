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
            'givenname' => 'Michael',
            'sans' => 'msupn:1540897553197005@mil',
            'surname' => 'Hall',
            'userprincipalname' => 'MICHAEL.HALL.1540897553@testusers.cce.af.mil',
            'iv-groups' => 'AFIN_TRANSIT,BA-AFMC-GUNTER-USERS,REMIS_USAF,AF_USERS',
        ],
    ],
];