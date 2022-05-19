#!/bin/bash
# Import AWS RDS certificates for DocumentDB

  comcert=https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem
  govcert=https://s3-us-gov-west-1.amazonaws.com/rds-downloads/rds-combined-ca-us-gov-bundle.pem
  usgovwest=https://truststore.pki.us-gov-west-1.rds.amazonaws.com/us-gov-west-1/us-gov-west-1-bundle.pem

  wget $comcert
  wget $govcert
  wget $usgovwest