import React from 'react'
import type { Meta } from '@storybook/react'

import { GridContainer, Grid } from '@trussworks/react-uswds'

export default {
  title: 'Global/Grid',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

const exampleStyles = {
  padding: '1rem',
  minHeight: 150,
  backgroundColor: '#e1e7f1',
}

const testContent = <div style={exampleStyles}>&nbsp;</div>

export const USSFDSGrid = (): React.ReactElement => (
  <>
    <GridContainer>
      <h1>Condensed</h1>

      <Grid row gap>
        {Array.from({ length: 12 }, (x, i) => (
          <Grid
            key={`gridCol_${i}`}
            col={3}
            mobile={{ col: 3 }}
            tabletLg={{ col: 2 }}
            desktopLg={{ col: 1 }}>
            {testContent}
          </Grid>
        ))}
      </Grid>
    </GridContainer>

    <GridContainer className="grid-container--spacious">
      <h1>Spacious</h1>

      <Grid row gap>
        {Array.from({ length: 12 }, (x, i) => (
          <Grid
            key={`gridCol_${i}`}
            col={3}
            mobile={{ col: 3 }}
            tabletLg={{ col: 2 }}
            desktopLg={{ col: 1 }}>
            {testContent}
          </Grid>
        ))}
      </Grid>
    </GridContainer>
  </>
)

export const USWDSGrid = (): React.ReactElement => (
  <GridContainer>
    <Grid row gap>
      {Array.from({ length: 12 }, (x, i) => (
        <Grid
          key={`gridCol_${i}`}
          col={3}
          mobile={{ col: 3 }}
          tabletLg={{ col: 2 }}
          desktopLg={{ col: 1 }}>
          {testContent}
        </Grid>
      ))}
    </Grid>
  </GridContainer>
)
