<?php

/**
 * @file
 * Used to define the test SAML user accounts.
 */

 /* get environment variables if testing auth locally */
 $common_name = getenv('COMMON_NAME') !== false ? getenv('COMMON_NAME') : 'default_common_name';
 $edipi = getenv('EDIPI') !== false ? getenv('EDIPI') : '0123456789';
 $givenname = getenv('GIVENNAME') !== false ? getenv('GIVENNAME') : 'default_givenname';
 $surname = getenv('SURNAME') !== false ? getenv('SURNAME') : 'default_surname';
 
$config = [
    'admin' => [
        'core:AdminPassword',
    ],
    'example-userpass' => [
        'exampleauth:UserPass',
        'user1:user1pass' => [
            'subject' => '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=CAMPBELL.BERNADETTE.5244446289',
            'edipi' => '5244446289',
            'common_name' => 'CAMPBELL.BERNADETTE.5244446289',
            'fascn' => '5244446289197004',
            'givenname' => 'BERNADETTE',
            'surname' => 'CAMPBELL',
            'userprincipalname' => 'BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil',
            'userGroups' => ['AF_USERS']
        ],
        'user2:user2pass' => [
            'subject' => '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=BOYD.RONALD.312969168',
            'edipi' => '312969168',
            'common_name' => 'BOYD.RONALD.312969168',
            'fascn' => '312969168197002',
            'givenname' => 'RONALD',
            'surname' => 'BOYD',
            'userprincipalname' => 'RONALD.BOYD.312969168@testusers.cce.af.mil',
            'userGroups' => ['AF_USERS']
        ],
        'localuser:localuserpass' => [
            'subject' => "/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN={$common_name}",
            'edipi' => $edipi,
            'common_name' => $common_name,
            'fascn' => '312969168197002',
            'givenname' => $givenname,
            'surname' => $surname,
            'userprincipalname' => $common_name,
            'userGroups' => ['PORTAL_SuperAdmins','AF_USERS']
        ],
        'portaladmin:portaladminpass' => [
            'subject' => '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=WILSON.LINDSEY.556070539',
            'edipi' => '556070539',
            'common_name' => 'WILSON.LINDSEY.556070539',
            'fascn' => '556070539197001',
            'givenname' => 'LINDSEY',
            'surname' => 'WILSON',
            'userprincipalname' => 'LINDSEY.WILSON.556070539@testusers.cce.af.mil',
            'userGroups' => ['PORTAL_SuperAdmins', 'AF_USERS']
        ],
        'cmsadmin:cmsadminpass' => [
            'subject' => '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=KING.FLOYD.376144527',
            'edipi' => '376144527',
            'common_name' => 'KING.FLOYD.376144527',
            'fascn' => '376144527197005',
            'givenname' => 'FLOYD',
            'surname' => 'KING',
            'userprincipalname' => 'FLOYD.KING.376144527@testusers.cce.af.mil',
            'userGroups' => ['PORTAL_CMS_Admins', 'AF_USERS']
        ],
        'analyticsadmin:analyticsadminpass' => [
            'subject' => '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=STIVERS.MARGARET.381324635',
            'edipi' => '381324635',
            'common_name' => 'STIVERS.MARGARET.381324635',
            'fascn' => '381324635197005',
            'givenname' => 'MARGARET',
            'surname' => 'STIVERS',
            'userprincipalname' => 'MARGARET.STIVERS.381324635@testusers.cce.af.mil',
            'userGroups' => ['PORTAL_Analytics_Admins', 'AF_USERS']
        ],
        'cmsuser:cmsuserpass' => [
            'subject' => '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=HENKE.JOHN.562270783',
            'edipi' => '562270783',
            'common_name' => 'HENKE.JOHN.562270783',
            'fascn' => '562270783197002',
            'givenname' => 'JOHN',
            'surname' => 'HENKE',
            'userprincipalname' => 'JOHN.HENKE.562270783@testusers.cce.af.mil',
            'userGroups' => ['PORTAL_CMS_Users', 'AF_USERS']
        ],
        'analyticsuser:analyticsuserpass' => [
            'subject' => '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=OKANE.HOLLY.402668108',
            'edipi' => '402668108',
            'common_name' => 'OKANE.HOLLY.402668108',
            'fascn' => '402668108197001',
            'givenname' => 'HOLLY',
            'surname' => 'OKANE',
            'userprincipalname' => 'HOLLY.OKANE.402668108@testusers.cce.af.mil',
            'userGroups' => ['PORTAL_Analytics_Users', 'AF_USERS']
        ],
        'cmsauthor:cmsauthorpass' => [
            'subject' => '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=NEAL.ETHEL.643097412',
            'edipi' => '643097412',
            'common_name' => 'NEAL.ETHEL.643097412',
            'fascn' => '643097412197002',
            'givenname' => 'ETHEL',
            'surname' => 'NEAL',
            'userprincipalname' => 'ETHEL.NEAL.643097412@testusers.cce.af.mil',
            'userGroups' => ['PORTAL_CMS_Users', 'AF_USERS']
        ],
        'cmsmanager:cmsmanagerpass' => [
            'subject' => '/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=HAVEN.CHRISTINA.561698119',
            'edipi' => '561698119',
            'common_name' => 'HAVEN.CHRISTINA.561698119',
            'fascn' => '561698119197002',
            'givenname' => 'CHRISTINA',
            'surname' => 'HAVEN',
            'userprincipalname' => 'CHRISTINA.HAVEN.561698119@testusers.cce.af.mil',
            'userGroups' => ['PORTAL_CMS_Users', 'AF_USERS']
        ],
    ],
];