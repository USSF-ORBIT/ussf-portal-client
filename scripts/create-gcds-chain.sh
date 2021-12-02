#!/bin/bash

cd /usr/local/share/ca-certificates

# Make GCDS Pem
for cert in "/usr/local/share/ca-certificates/DoD_Root_CA_3.crt" "/usr/local/share/ca-certificates/DOD_EMAIL_CA-49.crt" "/usr/local/share/ca-certificates/federation.dev.cce.af.mil.crt"; do
    (cat "${cert}") >> GCDS.pem;
done