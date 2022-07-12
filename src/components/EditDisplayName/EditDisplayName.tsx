import React, { useState } from 'react'
import { Grid } from '@trussworks/react-uswds'
// import styles from './EditDisplayName.module.scss'
import { useAuthContext } from 'stores/authContext'

type PropTypes = {
  handleEditDisplayName: (userId: string, displayName: string) => void
}

const EditDisplayName = ({ handleEditDisplayName }: PropTypes) => {
  const { user } = useAuthContext()
  const [currentDisplayName, setDisplayName] = useState<string>()

  const greeting = user
    ? `Welcome, ${user.attributes.givenname} ${user.attributes.surname}`
    : 'Welcome!'

  const updateDisplayName = () => {
    handleEditDisplayName(user?.userId, currentDisplayName)
  }

  return (
    <Grid row>
      <Grid col="fill">
        <h3>Update name and rank:</h3>

        <div>
          <label htmlFor="something">Current welcome display title:</label>
          <h1>{greeting}</h1>

          <label htmlFor="displayName">Update name</label>
          <Grid row gap={4}>
            <Grid col={4}>
              <input
                className="usa-input"
                type="text"
                name="displayName"
                placeholder="Enter a display name"
                required
                onChange={(event) => setDisplayName(event.target.value)}
              />
            </Grid>

            <Grid row gap={5} col="auto">
              <button
                type="button"
                className="usa-button usa-button--unstyled"
                data-testid="button">
                Cancel
              </button>
              <button
                type="button"
                className="usa-button"
                onClick={updateDisplayName}>
                Save
              </button>
            </Grid>
          </Grid>
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
            at (202)768-5432
          </p>
        </div>
      </Grid> */}
    </Grid>
  )
}

export default EditDisplayName
