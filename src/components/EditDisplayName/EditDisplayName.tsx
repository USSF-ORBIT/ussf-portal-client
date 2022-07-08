import React from 'react'
import { Grid, GridContainer } from '@trussworks/react-uswds'
import { useAuthContext } from 'stores/authContext'

const EditDisplayName = () => {
  const { user } = useAuthContext()

  const greeting = user
    ? `Welcome, ${user.attributes.givenname} ${user.attributes.surname}`
    : 'Welcome!'

  return (
    <GridContainer>
      <h3>Update name and rank:</h3>

      <form action="/">
        <label htmlFor="something">Current welcome display title:</label>
        <h1>{greeting}</h1>

        <label htmlFor="displayName">Update name</label>
        <Grid row>
          <Grid col={6}>
            <input
              className="usa-input"
              type="text"
              name="displayName"
              placeholder="Enter a display name"
              required
            />
          </Grid>

          <Grid row gap={4} col="auto">
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
    </GridContainer>
  )
}

export default EditDisplayName
