import React from 'react'
import {
  GridContainer,
  Grid,
  Checkbox,
  Dropdown,
  Textarea,
} from '@trussworks/react-uswds'
import styles from './SearchFilter.module.scss'

const SearchFilter = () => {
  return (
    <GridContainer className={styles.searchFilter}>
      <h2>Filter Search</h2>
      <Grid col="auto">
        <h3>Categories:</h3>
        <Checkbox
          id="application-filter"
          name="application"
          label="Application"
          className={styles.checkbox}
        />
        <Checkbox
          id="news-filter"
          name="news"
          label="News"
          className={styles.checkbox}
        />
        <Checkbox
          id="documentation-filter"
          name="documentation"
          label="Documentation"
          className={styles.checkbox}
        />
      </Grid>
      <Grid col="auto">
        <h3>Labels:</h3>
        <Dropdown id="label-dropdown" name="label-dropdown">
          <option>None applied</option>
          <option value="label-1">Label 1</option>
          <option value="label-2">Label 2</option>
          <option value="label-3">Label 3</option>
        </Dropdown>
      </Grid>
      <Grid col="auto">
        <h3>Tags:</h3>
        <Textarea id="tag-input" name="tag-input" style={{ resize: 'none' }} />
      </Grid>
    </GridContainer>
  )
}

export default SearchFilter
