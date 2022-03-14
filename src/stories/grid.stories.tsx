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

export const sfdsGrid = (): React.ReactElement => (
  <div className="sfds">
    <GridContainer>
      <h1>Condensed</h1>

      <Grid row gap>
        <Grid col>{testContent}</Grid>
        <Grid col>{testContent}</Grid>
        <Grid col>{testContent}</Grid>
        <Grid col>{testContent}</Grid>
      </Grid>
    </GridContainer>

    <GridContainer className="grid-container--spacious">
      <h1>Spacious</h1>

      <Grid row gap>
        <Grid col>{testContent}</Grid>
        <Grid col>{testContent}</Grid>
        <Grid col>{testContent}</Grid>
        <Grid col>{testContent}</Grid>
      </Grid>
    </GridContainer>
  </div>
)

export const uswdsGrid = (): React.ReactElement => (
  <GridContainer>
    <Grid row gap>
      <Grid col>{testContent}</Grid>
      <Grid col>{testContent}</Grid>
      <Grid col>{testContent}</Grid>
      <Grid col>{testContent}</Grid>
    </Grid>
  </GridContainer>
)
