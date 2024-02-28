import React, { useState } from 'react'
import { Grid, Alert } from '@trussworks/react-uswds'
import styles from './EditDisplayName.module.scss'
import { useAuthContext } from 'stores/authContext'

type PropTypes = {
  userDisplayName: string
  handleEditDisplayName: (userId: string, displayName: string) => void
}

const EditDisplayName = ({
  userDisplayName,
  handleEditDisplayName,
}: PropTypes) => {
  const { user } = useAuthContext()
  const [currentDisplayName, setDisplayName] = useState<string>('')
  const [submissionStatus, setSubmissionStatus] = useState<boolean>(false)

  const greeting = userDisplayName ? `Welcome, ${userDisplayName}` : 'Welcome!'

  const updateDisplayName = () => {
    if (!user) {
      return null
    }
    handleEditDisplayName(user.userId, currentDisplayName)
    setSubmissionStatus(true)
  }

  const resetDisplayName = () => {
    setDisplayName('')
    setSubmissionStatus(false)
  }

  return (
    <Grid row>
      <Grid col="fill">
        <div className={styles.updateNameAndRank}>
          <label htmlFor="something">Current welcome display title:</label>
          <p>{greeting}</p>

          <label htmlFor="displayName">
            Update display name <strong aria-hidden="true">*</strong>
          </label>

          <Grid row gap={4}>
            <Grid tablet={{ col: 4 }}>
              <input
                className="usa-input"
                type="text"
                id="displayName"
                placeholder="Enter a display name"
                value={currentDisplayName}
                maxLength={1000}
                onChange={(event) => setDisplayName(event.target.value)}
                data-testid="nameInput"
                required
              />
            </Grid>
            <Grid row tablet={{ col: true }} gap={5}>
              <button
                type="button"
                className="usa-button usa-button--unstyled"
                onClick={resetDisplayName}>
                Cancel
              </button>
              <button
                type="button"
                className={`usa-button ${styles.saveDisplayName}`}
                data-testid="saveButton"
                disabled={currentDisplayName === '' ? true : false}
                onClick={updateDisplayName}>
                Save
              </button>
            </Grid>
          </Grid>

          {submissionStatus && (
            <Grid row gap={4}>
              <Grid tablet={{ col: 4 }}>
                <Alert
                  className={styles.successMessage}
                  type="success"
                  headingLevel="h4">
                  New display name has been saved
                </Alert>
              </Grid>
            </Grid>
          )}
        </div>
      </Grid>

      {/* <Grid col="auto">
        <div className={styles.updateOfficialRecords}>
          <h3>
            Do your records, including your CAC, currently display and incorrect
            name or rank?
          </h3>
          <p>
            We can help with that. In order to change or update the name on your
            official records, you’ll need to call the office of IDs and Naming
            Stuff, or IDANS.
          </p>
          <p>
            You can reach them by phone, Monday through Saturday, 9am - 5pm GMT
            at <insert phone number>
          </p>
        </div>
      </Grid> */}
    </Grid>
  )
}

export default EditDisplayName
