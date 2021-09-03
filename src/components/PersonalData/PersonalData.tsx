import React from 'react'
import { Meta } from '@storybook/react'
import { GridContainer, Grid } from '@trussworks/react-uswds'
import styles from './PersonalData'

const PersonalData = () => {
  const testContent = 'test content'
  return (
    <>
      <h2>Welcome, Sgt Snuffy</h2>
      <GridContainer>
        <Grid row gap={2}>
          <Grid col={4}>
            <dl>
              <dt>Next PT Test:</dt>
              <dd>In 67 days on 12 Dec 2021</dd>
              <dt>Next Immunization:</dt>
              <dd>Influenza due on 04 July 2021</dd>
            </dl>
          </Grid>
          <Grid col={4}>
            <dl>
              <dt>Next EPR:</dt>
              <dd>In 245 days on 12 July 2022</dd>
              <dt>Current Leave Balance:</dt>
              <dd>20.5 Days</dd>
            </dl>
          </Grid>
        </Grid>
      </GridContainer>
    </>
  )
}

export default PersonalData
