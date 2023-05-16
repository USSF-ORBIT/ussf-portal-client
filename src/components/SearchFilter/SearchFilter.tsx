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
  // QUERY BUILDING:
  // category: application, news, documentation
  // label: label-1, label-2, label-3
  // tag: tag-1, tag-2, tag-3
  const [query, setQuery] = useState<string>('')

  // We are building a query to filter search on. This function runs each time any of the inputs
  // are changed. It looks at the current query and splits it into an array. It checks if the value
  // is already in the array. If it is, it removes it. If it isn't, it
  // adds it. Then it sets the query to the new array joined by spaces.
  const updateQuery = (queryValue: string) => {
    const queryArray = query.split(' ')
    if (queryArray.includes(queryValue)) {
      const index = queryArray.indexOf(queryValue)
      queryArray.splice(index, 1)
      setQuery(queryArray.join(' '))
    } else {
      setQuery(query + ' ' + queryValue)
    }
  }

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
            onChange={(e) => updateQuery(`category:${e.target.value}`)}
          />
          <Checkbox
            id="news-filter"
            name="news"
            label="News"
            value="news"
            className={styles.checkbox}
            onChange={(e) => updateQuery(`category:${e.target.value}`)}
          />
          <Checkbox
            id="documentation-filter"
            name="documentation"
            label="Documentation"
            value="documentation"
            className={styles.checkbox}
            onChange={(e) => updateQuery(`category:${e.target.value}`)}
          />
        </Grid>
        <Grid col="auto">
          <h5 className={styles.subHeader}>Labels:</h5>
          <Dropdown
            id="label-dropdown"
            name="label-dropdown"
            defaultValue={'default'}
            onChange={(e) => updateQuery(`label:${e.target.value}`)}>
            <option value="default" disabled>
              None applied
            </option>
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
