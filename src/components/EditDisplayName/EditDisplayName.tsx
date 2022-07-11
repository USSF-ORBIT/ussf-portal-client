import React from 'react'
import { Grid } from '@trussworks/react-uswds'
// import styles from './EditDisplayName.module.scss'
import { useAuthContext } from 'stores/authContext'

const EditDisplayName = () => {
  const { user } = useAuthContext()

  const greeting = user
    ? `Welcome, ${user.attributes.givenname} ${user.attributes.surname}`
    : 'Welcome!'

  return (
    <Grid row>
      <Grid col="fill">
        <h3>Update name and rank:</h3>

        <form action="/">
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
              />
            </Grid>

            <Grid row gap={5} col="auto">
              <button
                type="button"
                className="usa-button usa-button--unstyled"
                data-testid="button">
                Cancel
              </button>
              <button type="button" className="usa-button">
                Save
              </button>
            </Grid>
          </Grid>
        </form>
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
