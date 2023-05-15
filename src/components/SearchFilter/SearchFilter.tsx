import React, { useState } from 'react'
import {
  Grid,
  Checkbox,
  Dropdown,
  Textarea,
  Button,
} from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SearchFilter.module.scss'

const SearchFilter = () => {
  const [query, setQuery] = useState<string>('')

  return (
    <section className={styles.searchFilter}>
      <div className={styles.headerContainer}>
        <span aria-label="filter icon">
          <FontAwesomeIcon icon="filter" />
        </span>
        <h3>Filter Search</h3>
      </div>

      <form role="search" method="get" action="/search">
        <Grid col="auto">
          <h5 className={styles.subHeader}>Categories:</h5>
          <Checkbox
            id="application-filter"
            name="application"
            label="Application"
            value="application"
            className={styles.checkbox}
            onChange={(e) => setQuery(e.target.value)}
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
          <h5 className={styles.subHeader}>Labels:</h5>
          <Dropdown id="label-dropdown" name="label-dropdown">
            <option>None applied</option>
            <option value="label-1">Label 1</option>
            <option value="label-2">Label 2</option>
            <option value="label-3">Label 3</option>
          </Dropdown>
        </Grid>
        <Grid col="auto">
          <h5 className={styles.subHeader}>Tags:</h5>
          <Textarea
            id="tag-input"
            name="tag-input"
            style={{ resize: 'none' }}
          />
        </Grid>

        <Grid row className={styles.buttonContainer}>
          <Button type="submit" disabled={false}>
            <span className="usa-search__submit-text">Filter</span>
          </Button>
          <Button type="submit" outline disabled={false}>
            <span className="usa-search__submit-text">Reset</span>
          </Button>
        </Grid>
      </form>
    </section>
  )
}

export default SearchFilter
