import React from 'react'
import styles from './Search.module.scss'
import { useSearchContext } from 'stores/searchContext'

const Search = () => {
  const { searchQuery, setSearchQuery } = useSearchContext()

  return (
    <div className={styles.search}>
      <form
        id="search-form"
        className="usa-search usa-search--big"
        role="search"
        method="get"
        action="/search"
        onSubmit={(e) => {
          let finalSearchQuery = searchQuery

          // If finalSearchQuery has more than 200 characters, we need to truncate it
          if (searchQuery.length > 200) {
            finalSearchQuery = finalSearchQuery.substring(0, 200)
          }

          // Manually setting the value of the search input instead of waiting for the state to update
          const searchInput = document.getElementById('q') as HTMLInputElement
          searchInput.value = finalSearchQuery

          // Submit the form
          const form = e.target as HTMLFormElement
          form.submit()
        }}>
        <label className="usa-sr-only" htmlFor="q">
          Search
        </label>
        <input
          className="usa-input"
          id="q"
          type="search"
          name="q"
          data-testid="search-input"
          placeholder="What are you looking for today?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button className="usa-button" type="submit">
          <span className="usa-search__submit-text">Search</span>
        </button>
      </form>
    </div>
  )
}

export default Search
