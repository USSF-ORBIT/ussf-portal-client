// component itself

import React from 'react'
import styles from './AlphabeticalPagination.module.scss'
import { Button, Icon, Link } from '@trussworks/react-uswds'

type PaginationProps = {
  pathname: string // pathname of results page
  totalPages?: number // total items divided by items per page
  currentPage: number // current page number (starting at 1)
  maxSlots?: number // number of pagination "slots"
  onClickNext?: () => void
  onClickPrevious?: () => void
  onClickPageNumber?: (
    event: React.MouseEvent<HTMLButtonElement>,
    page: number
  ) => void
}

const AlphabeticalPagination = () => (
  <div className={styles.alphapag}>
    <nav aria-label="Pagination" className="usa-pagination">
      <ul className="usa-pagination__list">
        <li className="usa-pagination__item usa-pagination__arrow">
          <Button
            type="button"
            unstyled
            className="usa-pagination__link usa-pagination__previous-page"
            aria-label="Previous page">
            <Icon.NavigateBefore />
            <span className="usa-pagination__link-text">Previous</span>
          </Button>
        </li>
        <li className="usa-pagination__item usa-pagination__page-no">
          <Link href="#" className="usa-pagination__button" aria-label="Page 1">
            A
          </Link>
        </li>
        <li className="usa-pagination__item usa-pagination__page-no">
          <Link href="#" className="usa-pagination__button" aria-label="Page 9">
            B
          </Link>
        </li>
        <li className="usa-pagination__item usa-pagination__page-no">
          <Link
            href="#"
            className="usa-pagination__button usa-current"
            aria-label="Page 10"
            aria-current="page">
            C
          </Link>
        </li>
        <li className="usa-pagination__item usa-pagination__page-no">
          <Link
            href="#"
            className="usa-pagination__button"
            aria-label="Page 11">
            D
          </Link>
        </li>
        <li className="usa-pagination__item usa-pagination__page-no">
          <Link
            href="#"
            className="usa-pagination__button"
            aria-label="Last page, page 24">
            E
          </Link>
        </li>
        <li className="usa-pagination__item usa-pagination__arrow">
          <Button
            type="button"
            unstyled
            className="usa-pagination__link usa-pagination__next-page"
            aria-label="Next page">
            <span className="usa-pagination__link-text">Next</span>
            <Icon.NavigateNext />
          </Button>
        </li>
      </ul>
    </nav>

    {/* uswds uses quotes, not curlies */}
  </div>
)

export default AlphabeticalPagination
