import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid, Checkbox, Dropdown, Button } from '@trussworks/react-uswds'
import styles from './SearchFilter.module.scss'

type PropTypes = {
  labels: {
    name: string
  }[]
}

const SearchFilter = ({ labels }: PropTypes) => {
  // An array of strings that will be used to filter the search results
  const [filteredQuery, setFilteredQuery] = useState<string[]>([])

  const updateCheckedItems = (queryValue: string) => {
    if (filteredQuery.includes(queryValue)) {
      const index = filteredQuery.indexOf(queryValue)
      const queryArray = [...filteredQuery]
      queryArray.splice(index, 1)
      setFilteredQuery(queryArray)
    } else {
      setFilteredQuery([...filteredQuery, queryValue])
    }
  }
  return (
    <div className={styles.searchFilter}>
      <div className={styles.headerContainer}>
        <span aria-label="filter icon">
          <FontAwesomeIcon icon="filter" />
        </span>
        <h3>Filter Search</h3>
      </div>

      <Grid col="auto">
        <h5 className={styles.subHeader}>Categories:</h5>
        <Checkbox
          id="application-filter"
          name="application"
          label="Application"
          value="application"
          className={styles.checkbox}
          onChange={(e) => updateCheckedItems(`category:${e.target.value}`)}
        />
        <Checkbox
          id="news-filter"
          name="news"
          label="News"
          value="news"
          className={styles.checkbox}
          onChange={(e) => updateCheckedItems(`category:${e.target.value}`)}
        />
        <Checkbox
          id="documentation-filter"
          name="documentation"
          label="Documentation"
          value="documentation"
          className={styles.checkbox}
          onChange={(e) => updateCheckedItems(`category:${e.target.value}`)}
        />
      </Grid>
      <Grid col="auto">
        <h5 className={styles.subHeader}>Labels:</h5>
        <Dropdown
          id="label-dropdown"
          name="label-dropdown"
          defaultValue={'default'}
          onChange={(e) => {
            // Need to remove any previous label and add the newly selected one
            const labelToAdd = e.target.value

            // Filter out any previous label from the query
            const filteredArray = filteredQuery.filter(
              (label) => !label.includes('label:')
            )

            // Add the new label to the array
            filteredArray.push(`label:${labelToAdd}`)
            setFilteredQuery(filteredArray)
          }}>
          <option value="default" disabled>
            None applied
          </option>
          {labels.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Dropdown>
      </Grid>

      <form role="search" method="get" action="/search">
        <input
          id="q"
          type="search"
          name="q"
          style={{ display: 'none' }}
          // disabled={disabled}
          defaultValue={filteredQuery.join(' ')}
        />
        <Grid row className={styles.buttonContainer}>
          <Button type="submit" disabled={filteredQuery ? false : true}>
            <span className="usa-search__submit-text">Filter</span>
          </Button>
          <Button type="submit" outline disabled={false}>
            <span className="usa-search__submit-text">Reset</span>
          </Button>
        </Grid>
      </form>
    </div>
  )
}

export default SearchFilter
