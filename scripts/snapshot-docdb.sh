#! /bin/bash
set -e

# Snapshot ID
SSID=dbss-$(date +"%s")

# Create Snapshot
aws docdb create-db-cluster-snapshot \
  --db-cluster-identifier portal-client \
  --db-cluster-snapshot-identifier $SSID --tags Key=sha,Value=${IMAGE_TAG}

# DocDB Snapshot
DBSS=$(aws docdb describe-db-cluster-snapshots --db-cluster-snapshot-identifier $SSID |jq -r '.DBClusterSnapshots[]' | jq -r '.Status')

# Don't do anything else until it's available
# aws docdb does not have a `wait`
until [ "$DBSS" = "available" ]
    do
      DBSS=$(aws docdb describe-db-cluster-snapshots --db-cluster-snapshot-identifier $SSID |jq -r '.DBClusterSnapshots[]' | jq -r '.Status')
      echo $DBSS
    done
    echo "$SSID available!"
    continue
