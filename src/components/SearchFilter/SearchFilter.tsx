import React, { useState } from 'react'
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
  const { searchQuery, searchPageFilters, setSearchPageFilters } =
    useSearchContext()

  // Manages the state of the checkboxes and dropdown in the filter
  const [filterItems, setFilterItems] = useState({
    application: false,
    news: false,
    documentation: false,
    dropdown: '',
  })

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
          checked={filterItems.application}
          onChange={(e) => {
            setFilterItems({
              ...filterItems,
              application: !filterItems.application,
            })
            updateCheckedItems(`category:${e.target.value}`)
          }}
        />
        <Checkbox
          id="news-filter"
          name="news"
          label="News"
          value="news"
          className={styles.checkbox}
          checked={filterItems.news}
          onChange={(e) => {
            setFilterItems({
              ...filterItems,
              news: !filterItems.news,
            })
            updateCheckedItems(`category:${e.target.value}`)
          }}
        />
        <Checkbox
          id="documentation-filter"
          name="documentation"
          label="Documentation"
          value="documentation"
          className={styles.checkbox}
          checked={filterItems.documentation}
          onChange={(e) => {
            setFilterItems({
              ...filterItems,
              documentation: !filterItems.documentation,
            })
            updateCheckedItems(`category:${e.target.value}`)
          }}
        />
      </Grid>
      <Grid col="auto">
        <h5 className={styles.subHeader}>Labels:</h5>
        <Dropdown
          id="label-dropdown"
          name="label-dropdown"
          value={filterItems.dropdown ? filterItems.dropdown : 'default'}
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

            // Update the state of the dropdown
            setFilterItems({
              ...filterItems,
              dropdown: labelToAdd,
            })
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

      <form
        role="search"
        method="get"
        action="/search"
        onSubmit={(e) => {
          // Before submitting the form, we need to add the current value of searchQuery to the
          // end of the searchPageFilters array
          setSearchPageFilters([...searchPageFilters, searchQuery])

          // Submit the form
          const form = e.target as HTMLFormElement
          form.submit()
        }}>
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
          <Button
            type="submit"
            outline
            disabled={false}
            onClick={(e) => {
              e.preventDefault()
              setSearchPageFilters([])
              setFilterItems({
                application: false,
                news: false,
                documentation: false,
                dropdown: '',
              })
            }}>
            <span className="usa-search__submit-text">Reset</span>
          </Button>
        </Grid>
      </form>
    </div>
  )
}

export default SearchFilter
