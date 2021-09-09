import React from 'react'
import styles from './Search.module.scss'
import LinkTo from 'components/util/LinkTo/LinkTo'

const Search = () => {
  return (
    <div className={styles.search}>
      <form className="usa-search usa-search--big" role="search">
        <label className="usa-sr-only" htmlFor="options">
          Search Options
        </label>
        <select className="usa-select usa-button" name="options" id="options">
          <option value="all">All</option>
          <option value="value1">Option 1</option>
          <option value="value2">Option 2</option>
          <option value="value3">Option 3</option>
        </select>

        <label className="usa-sr-only" htmlFor="search-field-en-big">
          Search
        </label>
        <input
          className="usa-input"
          id="search-field-en-big"
          type="search"
          name="search"
          placeholder="What are you looking for today?"
        />

        <button className="usa-button" type="submit">
          <span className="usa-search__submit-text">Search</span>
        </button>
      </form>
      <div className={styles.suggestedTerms}>
        <h3>Are you looking for:</h3>
        <ul>
          <li>
            <LinkTo href="/">PT Tests</LinkTo>,
          </li>
          <li>
            <LinkTo href="/">TRICARE</LinkTo>,
          </li>
          <li>
            <LinkTo href="/">MyPay</LinkTo>,
          </li>
          <li>
            <LinkTo href="/">Leaveweb</LinkTo>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Search
