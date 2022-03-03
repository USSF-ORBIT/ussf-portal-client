#! /bin/bash
set -e

aws docdb create-db-cluster-snapshot \
  --db-cluster-identifier ${DOCDB_CLUSTER_IDENTIFIER} \
  --db-cluster-snapshot-identifier dbss-${IMAGE_TAG}