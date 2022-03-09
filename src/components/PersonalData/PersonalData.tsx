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
    </div>
  )
}

export default PersonalData
