#!/bin/bash

cd /usr/local/share/ca-certificates

# Make Dev GCDS PEM
for cert in "/usr/local/share/ca-certificates/DoD_Root_CA_3.crt" "/usr/local/share/ca-certificates/DOD_EMAIL_CA-59.crt" "/usr/local/share/ca-certificates/federation.dev.cce.af.mil.crt"; do
    (cat "${cert}") >> Dev-GCDS.pem;
done

# Make Test GCDS PEM
for cert in "/usr/local/share/ca-certificates/DoD_Root_CA_3.crt" "/usr/local/share/ca-certificates/DOD_EMAIL_CA-59.crt" "/usr/local/share/ca-certificates/federation.test.cce.af.mil.crt"; do
    (cat "${cert}") >> Test-GCDS.pem;
done

# Make Prod GCDS PEM
for cert in "/usr/local/share/ca-certificates/DoD_Root_CA_3.crt" "/usr/local/share/ca-certificates/DOD_EMAIL_CA-59.crt" "/usr/local/share/ca-certificates/federation.prod.cce.af.mil.crt"; do
    (cat "${cert}") >> Prod-GCDS.pem;
done
