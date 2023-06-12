#! /usr/bin/env bash

mkdir -p 'public/vendor'

cp -r 'node_modules/@uswds/uswds/dist/fonts' 'public/vendor/fonts'
cp -r 'node_modules/@uswds/uswds/dist/img' 'public/vendor/img'
