import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import styles from './PersonalData.module.scss'

const PersonalData = () => {
  return (
    <div className={styles.personalData}>
      <h2>Welcome, Sgt Snuffy</h2>

      <dl className="grid-row">
        <Grid tablet={{ col: true }}>
          <dt>Next PT Test:</dt>
          <dd>In 67 days on 12 Dec 2021</dd>

          <dt>Next Immunization:</dt>
          <dd>Influenza due on 04 July 2021</dd>
        </Grid>
        <Grid tablet={{ col: true }}>
          <dt>Next EPR:</dt>
          <dd>In 245 days on 12 July 2022</dd>

          <dt>Current Leave Balance:</dt>
          <dd>20.5 Days</dd>
        </Grid>
      </dl>
    </div>
  )
}

export default PersonalData
