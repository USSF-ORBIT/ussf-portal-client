import React from 'react'
import { withLDConsumer } from 'launchdarkly-react-client-sdk'
import { LDFlagSet } from 'launchdarkly-js-client-sdk'
import { GridContainer, Grid } from '@trussworks/react-uswds'

import styles from './PageHeader.module.scss'

import Search from 'components/Search/Search'

const PageHeader = ({
  children,
  flags,
}: {
  children: React.ReactNode
  flags?: LDFlagSet
}) => {
  return (
    <div className={styles.PageHeader}>
      <GridContainer>
        <Grid row gap>
          <Grid col="auto" desktop={{ col: 6 }}>
            {children}
          </Grid>

          <Grid col="auto" desktop={{ col: 6 }}>
            {flags?.searchComponent ? <Search /> : <Search disabled={true} />}
          </Grid>
        </Grid>
      </GridContainer>
    </div>
  )
}

export default withLDConsumer()(PageHeader)
