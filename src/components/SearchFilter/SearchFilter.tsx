import React, { useState } from 'react'
import {
  Grid,
  Checkbox,
  Dropdown,
  Button,
  Label,
  Fieldset,
} from '@trussworks/react-uswds'
import styles from './SearchFilter.module.scss'
import { useSearchContext } from 'stores/searchContext'

type PropTypes = {
  labels: {
    name: string
  }[]
}

const SearchFilter = ({ labels }: PropTypes) => {
  const { searchQuery, setSearchQuery } = useSearchContext()

  // Manages the state of the checkboxes and dropdown in the filter
  const [filterItems, setFilterItems] = useState({
    application: searchQuery.includes('category:application') ? true : false,
    news: searchQuery.includes('category:news') ? true : false,
    documentation: searchQuery.includes('category:documentation')
      ? true
      : false,
    // A label can exist in two forms: label:labelName or label:"label name"
    // If we split searchQuery at label: and there is a " immediately after, we know the label is in quotes
    // and we need to get all the characters between the quotes. After we have the label, we need to remove
    // the quotes and set the dropdown state to the label
    dropdown:
      searchQuery.includes('label:') &&
      searchQuery.split('label:')[1].charAt(0) === '"'
        ? searchQuery.split('label:')[1].split('"')[1].split('"')[0]
        : searchQuery.includes('label:') &&
          searchQuery.split('label:')[1].split(' ')[0],
  })

  const updateCheckedItems = (checkboxValue: string) => {
    checkboxValue = 'category:' + checkboxValue

    // If the searchQuery already includes the checkboxValue, remove it
    if (searchQuery.includes(checkboxValue)) {
      setSearchQuery(searchQuery.replace(checkboxValue, ''))
    } else {
      // Add the checkboxValue to the front of the searchQuery
      setSearchQuery([checkboxValue, searchQuery].join(' '))
    }
  }

  return (
    <div className={styles.searchFilter}>
      <div className={styles.headerContainer}>
        <h3>Filter Search</h3>
      </div>

      <Grid col="auto">
        <Fieldset
          legend={<h4 className={styles.subHeader}>Categories:</h4>}
          className={styles.checkboxFieldset}>
          <div>
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
          </div>
        </Fieldset>
      </Grid>
      <Grid col="auto">
        <Label htmlFor="label-dropdown">
          <h4 className={styles.subHeader}>Labels:</h4>
        </Label>
        <Dropdown
          id="label-dropdown"
          name="label-dropdown"
          data-testid="label-dropdown"
          value={filterItems.dropdown ? filterItems.dropdown : 'default'}
          onChange={(e) => {
            const labelToAdd = e.target.value

            // Filter out any previous label from the query
            const filteredArray = searchQuery
              .split(' ')
              .filter((label) => !label.includes('label:'))

            // If the user selects the default option, update the state with the removed label and return
            if (labelToAdd === 'default') {
              setSearchQuery(filteredArray.join(' '))
              setFilterItems({
                ...filterItems,
                dropdown: '',
              })
              return
            }

            // If the dropdown value has more than one word, add quotes around it.
            // When adding a label to the searchQuery, add it to the front using unshift
            if (labelToAdd.includes(' ')) {
              filteredArray.unshift(`label:"${labelToAdd}"`)
            } else {
              filteredArray.unshift(`label:${labelToAdd}`)
            }

            // Combine the array into a string and update the searchQuery state
            setSearchQuery(filteredArray.join(' '))

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
          disabled={
            filterItems.application ||
            filterItems.documentation ||
            filterItems.news ||
            filterItems.dropdown
              ? false
              : true
          }
          onClick={() => {
            // Get the id for the search form
            const searchForm = document.getElementById(
              'search-form'
            ) as HTMLFormElement

            searchForm.submit()
          }}>
          <span className="usa-search__submit-text">Filter</span>
        </Button>
        <Button
          type="submit"
          outline
          disabled={false}
          onClick={() => {
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
