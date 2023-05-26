import React, { useState, useEffect } from 'react'
import {
  Grid,
  Checkbox,
  Dropdown,
  Button,
  Label,
} from '@trussworks/react-uswds'
import styles from './SearchFilter.module.scss'
import { useSearchContext } from 'stores/searchContext'

type PropTypes = {
  labels: {
    name: string
  }[]
}

const SearchFilter = ({ labels }: PropTypes) => {
  const { searchQuery } = useSearchContext()

  const [searchPageFilters, setSearchPageFilters] = useState<string[]>([])

  // Manages the state of the checkboxes and dropdown in the filter
  const [filterItems, setFilterItems] = useState(
    localStorage.getItem('filterItems')
      ? JSON.parse(localStorage.getItem('filterItems') as string)
      : {
          application: false,
          news: false,
          documentation: false,
          dropdown: '',
        }
  )

  // When the filterItems state changes, update local storage
  useEffect(() => {
    localStorage.setItem('filterItems', JSON.stringify(filterItems))
  }, [filterItems])

  // Load the filterItems state from local storage
  useEffect(() => {
    const savedFilterItems = localStorage.getItem('filterItems')
    if (savedFilterItems) {
      setFilterItems(JSON.parse(savedFilterItems))

      // If there is a true value in the filterItems state, add it to the searchPageFilters array with a category: prefix
      const filterItemsArray = Object.entries(JSON.parse(savedFilterItems))
      const filterItemsToSearch = filterItemsArray
        .filter((item) => item[1] === true)
        .map((item) => `category:${item[0]}`)
      setSearchPageFilters(filterItemsToSearch)
    }
  }, [])

  // This function updates the searchPageFilters array based on the checkboxes
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
        <h3>Filter Search</h3>
      </div>

      <Grid col="auto">
        <h4 className={styles.subHeader}>Categories:</h4>
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
        <Label htmlFor="label-dropdown" className={styles.subHeader}>
          Labels:
        </Label>
        <Dropdown
          id="label-dropdown"
          name="label-dropdown"
          data-testid="label-dropdown"
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
            <option
              key={name}
              value={name}
              aria-selected={filterItems.dropdown === name ? true : false}>
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

          // Save the filterItems state to local storage
          localStorage.setItem('filterItems', JSON.stringify(filterItems))

          // Submit the form
          const form = e.target as HTMLFormElement
          form.submit()
        }}>
        <input
          id="q"
          type="search"
          name="q"
          style={{ display: 'none' }}
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

              // Reset the searchPageFilters array
              setSearchPageFilters([])

              // Reset the filterItems state
              setFilterItems({
                application: false,
                news: false,
                documentation: false,
                dropdown: '',
              })

              // Save the filterItems state to local storage
              localStorage.setItem(
                'filterItems',
                JSON.stringify({
                  application: false,
                  news: false,
                  documentation: false,
                  dropdown: '',
                })
              )
            }}>
            <span className="usa-search__submit-text">Reset</span>
          </Button>
        </Grid>
      </form>
    </div>
  )
}

export default SearchFilter
