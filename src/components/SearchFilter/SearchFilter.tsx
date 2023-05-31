import React, { useState } from 'react'
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
  const {
    searchQuery,
    setSearchQuery,
    searchPageFilters,
    setSearchPageFilters,
  } = useSearchContext()

  // Manages the state of the checkboxes and dropdown in the filter
  const [filterItems, setFilterItems] = useState({
    application: searchQuery.includes('category:application') ? true : false,
    news: searchQuery.includes('category:news') ? true : false,
    documentation: searchQuery.includes('category:documentation')
      ? true
      : false,
    dropdown:
      searchQuery && searchQuery.includes('label:')
        ? searchQuery.split('label:')[1].split(' ')[0].replace(/"/g, '')
        : '',
  })

  // If the checked item is already in the searchPageFilters array, remove it. Otherwise, add it.
  const updateCheckedItems = (checkboxValue: string) => {
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
          value={
            filterItems.dropdown.length > 0 ? filterItems.dropdown : 'default'
          }
          onChange={(e) => {
            // Need to remove any previous label and add the newly selected one
            const labelToAdd = e.target.value

            // Filter out any previous label from the query
            const filteredArray = searchPageFilters.filter(
              (label) => !label.includes('label:')
            )

            // If the user selects the default option, update the state with the removed label and return
            if (labelToAdd === 'default') {
              setSearchPageFilters(filteredArray)
              setFilterItems({
                ...filterItems,
                dropdown: '',
              })
              return
            }

            // If the dropdown value has more than one word, add quotes around it
            if (labelToAdd.includes(' ')) {
              filteredArray.push(`label:"${labelToAdd}"`)
            } else {
              filteredArray.push(`label:${labelToAdd}`)
            }

            // Add the new label to the array
            setSearchPageFilters(filteredArray)

            // Update the state of the dropdown
            setFilterItems({
              ...filterItems,
              dropdown: labelToAdd,
            })
          }}>
          <option
            value="default"
            aria-selected={filterItems.dropdown === '' ? true : false}>
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

      <Grid row className={styles.buttonContainer}>
        <Button
          type="button"
          disabled={searchPageFilters.length > 0 ? false : true}
          onClick={() => {
            // Get the id for the search form
            const searchForm = document.getElementById(
              'search-form'
            ) as HTMLFormElement

            // Before submitting the form, we need to combine the filters with the search query
            let finalSearchQuery = [...searchPageFilters, searchQuery].join(' ')

            // If finalSearchQuery has more than 200 characters, we need to truncate it
            if (finalSearchQuery.length > 200) {
              finalSearchQuery = finalSearchQuery.substring(0, 200)
            }

            // Manually setting the value of the search input instead of waiting for the state to update
            const searchInput = document.getElementById('q') as HTMLInputElement
            searchInput.value = finalSearchQuery

            // Submit the form
            searchForm.submit()
          }}>
          <span className="usa-search__submit-text">Filter</span>
        </Button>
        <Button
          type="submit"
          outline
          disabled={false}
          onClick={() => {
            // Reset the searchPageFilters array
            setSearchPageFilters([])

            // Reset the search input
            setSearchQuery('')

            // Reset the filterItems state
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
    </div>
  )
}

export default SearchFilter
