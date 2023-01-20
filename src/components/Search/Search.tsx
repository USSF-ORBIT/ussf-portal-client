import React from 'react'
import { withLDConsumer } from 'launchdarkly-react-client-sdk'
import { LDFlagSet } from 'launchdarkly-js-client-sdk'
import styles from './Search.module.scss'
// import LinkTo from 'components/util/LinkTo/LinkTo'

const Search = ({ flags }: { flags?: LDFlagSet }) => {
  // TODO - re-add filter dropdown & suggested terms as future work

  return (
    <>
      {flags && flags.searchComponent ? (
        <div className={styles.search}>
          <div>
            <form
              className="usa-search usa-search--big"
              role="search"
              method="get"
              action="/search">
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
                placeholder="What are you looking for today?"
              />

              <button className="usa-button" type="submit">
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
      ) : null}
    </>
  )
}

export default withLDConsumer()(Search)
