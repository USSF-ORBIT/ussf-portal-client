#!/bin/bash
# Import DoD root certificates into linux CA store

    # Extract the bundle
    cd /usr/local/share/ca-certificates
    mv /app/fetch-manifest-resources/unclass-certificates_pkcs7_DoD.zip ./
    unzip unclass-certificates_pkcs7_DoD.zip
    mv certificates_pkcs7_v5_*_dod/* ./


    # Convert the PKCS#7 bundle into individual PEM files
    for i in *.p7b; do
        openssl pkcs7 -in $i -inform der -print_certs -out $i.pem
    done

    # Rename the files based on the CA name
    for i in *.pem; do
        name=$(openssl x509 -noout -subject -in $i |
               awk -F '(=|= )' '{gsub(/ /, "_", $NF); print $NF}'
        )
        mv $i ${name}.crt
    done

    # update certificate stores
    update-ca-certificates

    rm unclass-certificates_pkcs7_DoD.zip
