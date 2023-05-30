import React from 'react'
import classnames from 'classnames'
import styles from './Search.module.scss'
import { useSearchContext } from 'stores/searchContext'
// import LinkTo from 'components/util/LinkTo/LinkTo'

const Search = ({
  disabled,
  query,
}: {
  disabled?: boolean
  query?: string
}) => {
  const { searchQuery, searchPageFilters, setSearchQuery } = useSearchContext()

  const disableClass = classnames({
    [styles.disabled]: disabled,
  })

  // TODO - re-add filter dropdown & suggested terms as future work

  return (
    <div className={styles.search}>
      {disabled && (
        <div className={styles.comingSoon}>
          <h4>Search coming soon!</h4>
        </div>
      )}
      <div className={disableClass}>
        <form
          className="usa-search usa-search--big"
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

            // Submit the form
            const form = e.target as HTMLFormElement
            form.submit()
          }}>
          {/*
          <label className="usa-sr-only" htmlFor="options">
            Search Options
          </label>
          <select
            className="usa-select usa-button"
            name="options"
            id="options"
            disabled={disabled}>
            <option value="all">All</option>
            <option value="value1">Option 1</option>
            <option value="value2">Option 2</option>
            <option value="value3">Option 3</option>
          </select>
      */}

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
            disabled={disabled}
            defaultValue={searchQuery || query}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button className="usa-button" type="submit" disabled={disabled}>
            <span className="usa-search__submit-text">Search</span>
          </button>
        </form>

        {/*
        <div className={styles.suggestedTerms}>
          <h3>Are you looking for:</h3>
          <ul>
            <li>
              <LinkTo href="/" tabIndex={-1}>
                PT Tests
              </LinkTo>
              ,
            </li>
            <li>
              <LinkTo href="/" tabIndex={-1}>
                TRICARE
              </LinkTo>
              ,
            </li>
            <li>
              <LinkTo href="/" tabIndex={-1}>
                MyPay
              </LinkTo>
              ,
            </li>
            <li>
              <LinkTo href="/" tabIndex={-1}>
                Leaveweb
              </LinkTo>
            </li>
          </ul>
        </div>
    */}
      </div>
    </div>
  )
}

export default Search
