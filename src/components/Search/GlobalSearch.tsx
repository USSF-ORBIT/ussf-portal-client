import React from 'react'
import styles from './GlobalSearch.module.scss'

const GlobalSearch = () => {
  return (
    <form
      className={`usa-search usa-search--big ${styles.globalSearch}`}
      role="search">
      <select className="usa-select usa-button" name="options" id="options">
        <option value="all">All</option>
        <option value="value1">Option 1</option>
        <option value="value2">Option 2</option>
        <option value="value3">Option 3</option>
      </select>

      <input
        className="usa-input"
        id="search-field-en-big"
        type="search"
        name="search"
      />
      <button className="usa-button" type="submit">
        <span className="usa-search__submit-text">Search</span>
      </button>
    </form>
  )
}

export default GlobalSearch
