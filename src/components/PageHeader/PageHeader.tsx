import React from 'react'
import { GridContainer, Grid } from '@trussworks/react-uswds'

import styles from './PageHeader.module.scss'

import Search from 'components/Search/Search'

const PageHeader = ({
  children,
  searchDisplay = true,
}: {
  searchDisplay?: boolean
  children: React.ReactNode
}) => {
  return (
    <div className={styles.PageHeader}>
      <GridContainer>
        <Grid row gap>
          <Grid col="auto" desktop={{ col: 6 }}>
            {children}
          </Grid>

          {searchDisplay && (
            <Grid col="auto" desktop={{ col: 6 }}>
              <Search />
            </Grid>
          )}
        </Grid>
      </GridContainer>
    </div>
  )
}

export default PageHeader
