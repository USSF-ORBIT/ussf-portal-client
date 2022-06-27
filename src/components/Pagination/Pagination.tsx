import React from 'react'
import classnames from 'classnames'
import { Icon, Link } from '@trussworks/react-uswds'
import LinkTo from 'components/util/LinkTo/LinkTo'

type PaginationProps = {
  pages: string[] // Array of URLs for each page #
  currentPage: number // current page number (starting at 1)
  unbounded?: boolean // do we know the # of pages?
  pageOverflow?: number // number of pagination "slots"
}

/**
 * test cases:
 * - default
 * - unbounded (unknown # of pages)
 * - fewer than overflow limit (7)
 * - on first page
 * - on last page
 * - overflow before
 * - overflow after
 * - overflow both
 */

const Pagination = ({
  pages,
  currentPage,
  unbounded = false,
  className,
  pageOverflow = 7,
  ...props
}: PaginationProps & JSX.IntrinsicElements['nav']) => {
  const navClasses = classnames('usa-pagination', className)

  const isOnFirstPage = currentPage === 1
  const isOnLastPage = currentPage === pages.length

  const [firstPage, ...remainingPages] = pages
  const [lastPage] = remainingPages.splice(remainingPages.length - 1, 1)

  return (
    <nav aria-label="Pagination" className={navClasses} {...props}>
      <ul className="usa-pagination__list">
        {!isOnFirstPage && (
          <li className="usa-pagination__item usa-pagination__arrow">
            <LinkTo
              href={firstPage}
              className="usa-pagination__link usa-pagination__previous-page"
              aria-label="Previous page">
              <Icon.NavigateBefore />
              <span className="usa-pagination__link-text">Previous</span>
            </LinkTo>
          </li>
        )}

        {remainingPages.map((p, i) => {
          const pageNum = i + 1
          const linkClasses = classnames('usa-pagination__button', {
            'usa-current': pageNum === currentPage,
          })

          return (
            <li
              key={`pagination_page_${pageNum}`}
              className="usa-pagination__item usa-pagination__page-no">
              <LinkTo
                href={p}
                className={linkClasses}
                aria-label={`Page ${pageNum}`}>
                {pageNum}
              </LinkTo>
            </li>
          )
        })}

        {!isOnLastPage && (
          <li className="usa-pagination__item usa-pagination__arrow">
            <LinkTo
              href={lastPage}
              className="usa-pagination__link usa-pagination__next-page"
              aria-label="Next page">
              <span className="usa-pagination__link-text">Next</span>
              <Icon.NavigateNext />
            </LinkTo>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
