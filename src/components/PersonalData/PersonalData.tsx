import React from 'react'
import { Grid } from '@trussworks/react-uswds'

import styles from './PersonalData.module.scss'

import { useAuthContext } from 'stores/authContext'

const PersonalData = () => {
  const { user } = useAuthContext()

  const greeting = user
    ? `Welcome, ${user.attributes.givenname} ${user.attributes.surname}`
    : 'Welcome!'

  return (
    <div className={styles.personalData}>
      <h2>{greeting}</h2>

      <dl className="grid-row">
        <Grid tablet={{ col: true }}>
          <dt>Next PT Test:</dt>
          <dd>
            <a
              href="https://myfss.us.af.mil/USAFCommunity/s/"
              target="_blank"
              rel="noreferrer noopener">
              Check on myFSS
            </a>
          </dd>

          <dt>Next Immunization:</dt>
          <dd>
            <a
              href="https://asimsimr.health.mil/"
              target="_blank"
              rel="noreferrer noopener">
              Check on IMR
            </a>
          </dd>
        </Grid>
        <Grid tablet={{ col: true }}>
          <dt>Next Performance Report:</dt>
          <dd>
            <a
              href="https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx"
              target="_blank"
              rel="noreferrer noopener">
              Check on vMPF
            </a>
          </dd>

          <dt>Current Leave Balance:</dt>
          <dd>
            <a
              href="https://leave.af.mil/profile"
              target="_blank"
              rel="noreferrer noopener">
              Check on LeaveWeb
            </a>
          </dd>
        </Grid>
      </dl>
    </div>
  )
}

export default PersonalData
