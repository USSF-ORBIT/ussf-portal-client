import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid, Checkbox, Dropdown, Button } from '@trussworks/react-uswds'
import styles from './SearchFilter.module.scss'
import { useSearchContext } from 'stores/searchContext'

type PropTypes = {
  labels: {
    name: string
  }[]
}

const SearchFilter = ({ labels }: PropTypes) => {
  const { searchPageFilters, setSearchPageFilters } = useSearchContext()

  const updateCheckedItems = (queryValue: string) => {
    if (searchPageFilters.includes(queryValue)) {
      const index = searchPageFilters.indexOf(queryValue)
      const queryArray = [...searchPageFilters]
      queryArray.splice(index, 1)
      setSearchPageFilters(queryArray)
    } else {
      setSearchPageFilters([...searchPageFilters, queryValue])
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
            const filteredArray = searchPageFilters.filter(
              (label) => !label.includes('label:')
            )

            // Add the new label to the array
            filteredArray.push(`label:${labelToAdd}`)
            setSearchPageFilters(filteredArray)
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
          defaultValue={searchPageFilters.join(' ')}
        />
        <Grid row className={styles.buttonContainer}>
          <Button
            type="submit"
            disabled={searchPageFilters.length > 0 ? false : true}>
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
