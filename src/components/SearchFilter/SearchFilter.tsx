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
  const { searchQuery, searchPageFilters, setSearchPageFilters } =
    useSearchContext()

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

      // If there is a value in the dropdown, add it to the searchPageFilters array with a label: prefix
      if (filterItems.dropdown) {
        // If the dropdown value has more than one word, add quotes around it
        if (filterItems.dropdown.includes(' ')) {
          filterItemsToSearch.push(`label:"${filterItems.dropdown}"`)
        } else {
          filterItemsToSearch.push(`label:${filterItems.dropdown}`)
        }
      }

      setSearchPageFilters(filterItemsToSearch)
    }
  }, [])

  // If the checked item is already in the searchPageFilters array, remove it. Otherwise, add it.
  const updateCheckedItems = (checkboxValue: string) => {
    // If the checkbox value has more than one word, add quotes around it
    if (checkboxValue.includes(' ')) {
      checkboxValue = `"${checkboxValue}"`
    }

    checkboxValue = 'category:' + checkboxValue

    if (searchPageFilters.includes(checkboxValue)) {
      const index = searchPageFilters.indexOf(checkboxValue)
      const filterArray = [...searchPageFilters]
      filterArray.splice(index, 1)
      setSearchPageFilters(filterArray)
    } else {
      setSearchPageFilters([...searchPageFilters, checkboxValue])
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
            updateCheckedItems(e.target.value)
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
            updateCheckedItems(e.target.value)
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
            updateCheckedItems(e.target.value)
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

            // if the user selects the default option, don't add anything to the array
            if (labelToAdd === 'default') {
              setSearchPageFilters(filteredArray)
              setFilterItems({
                ...filterItems,
                dropdown: '',
              })
              return
            }

            // Add the new label to the array
            filteredArray.push(`label:${labelToAdd}`)
            setSearchPageFilters(filteredArray)

            // Update the state of the dropdown
            setFilterItems({
              ...filterItems,
              dropdown: labelToAdd,
            })
          }}>
          <option value="default">None applied</option>
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
          // Before submitting the form, we need to combine the filters with the search query
          let finalSearchQuery = [...searchPageFilters, searchQuery].join(' ')

          // If finalSearchQuery has more than 200 characters, we need to truncate it
          if (finalSearchQuery.length > 200) {
            finalSearchQuery = finalSearchQuery.substring(0, 200)
          }

          // Manually setting the value of the search input instead of waiting for the state to update
          const searchInput = document.getElementById('q') as HTMLInputElement
          searchInput.value = finalSearchQuery

          // Save the filterItems state to local storage
          // localStorage.setItem('filterItems', JSON.stringify(filterItems))

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
