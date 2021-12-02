import React from 'react'
import { GridContainer, Grid } from '@trussworks/react-uswds'

import styles from './PageHeader.module.scss'

import Search from 'components/Search/Search'

const PageHeader = ({
  disableSearch,
  children,
}: {
  disableSearch?: boolean
  children: React.ReactNode
}) => {
  return (
    <div className={`usa-dark-background ${styles.PageHeader}`}>
      <GridContainer containerSize="widescreen">
        <Grid row gap>
          <Grid col="auto" desktop={{ col: 6 }}>
            {children}
          </Grid>
          <Grid col="auto" desktop={{ col: 6 }}>
            <Search disabled={disableSearch} />
          </Grid>
        </Grid>
      </GridContainer>
    </div>
  )
}

export default PageHeader
