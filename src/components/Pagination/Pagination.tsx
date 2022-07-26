import React from 'react'
import classnames from 'classnames'
import { Icon } from '@trussworks/react-uswds'
import LinkTo from 'components/util/LinkTo/LinkTo'

type PaginationProps = {
  pathname: string // pathname of results page
  totalPages: number // total items divided by items per page
  currentPage: number // current page number (starting at 1)
  maxSlots?: number // number of pagination "slots"
}

const PaginationPage = ({
  page,
  isCurrent,
  pathname,
}: {
  pathname: string
  page: number
  isCurrent?: boolean
}) => {
  const linkClasses = classnames('usa-pagination__button', {
    'usa-current': isCurrent,
  })

  return (
    <li
      key={`pagination_page_${page}`}
      className="usa-pagination__item usa-pagination__page-no">
      <LinkTo
        href={`${pathname}?page=${page}`}
        className={linkClasses}
        aria-label={`Page ${page}`}
        aria-current={isCurrent ? 'page' : undefined}>
        {page}
      </LinkTo>
    </li>
  )
}

const PaginationOverflow = () => (
  <li
    className="usa-pagination__item usa-pagination__overflow"
    role="presentation">
    <span>…</span>
  </li>
)

const Pagination = ({
  pathname,
  totalPages,
  currentPage,
  className,
  maxSlots = 7,
  ...props
}: PaginationProps & JSX.IntrinsicElements['nav']) => {
  const navClasses = classnames('usa-pagination', className)

  const isOnFirstPage = currentPage === 1
  const isOnLastPage = currentPage === totalPages

  const showOverflow = totalPages > maxSlots // If more pages than slots, use overflow indicator(s)

  const middleSlot = Math.round(maxSlots / 2) // 4 if maxSlots is 7
  const showPrevOverflow = showOverflow && currentPage > middleSlot
  const showNextOverflow =
    showOverflow && totalPages - currentPage >= middleSlot

  // Assemble array of page numbers to be shown
  const currentPageRange: Array<number | 'overflow'> = showOverflow
    ? [currentPage]
    : Array.from({ length: totalPages }).map((_, i) => i + 1)

  if (showOverflow) {
    // Determine range of pages to show based on current page & number of slots
    // Follows logic described at: https://designsystem.digital.gov/components/pagination/
    const prevSlots = isOnFirstPage ? 0 : showPrevOverflow ? 2 : 1 // first page + prev overflow
    const nextSlots = isOnLastPage ? 0 : showNextOverflow ? 2 : 1 // next overflow + last page
    const pageRangeSize = maxSlots - 1 - (prevSlots + nextSlots) // remaining slots to show (minus one for the current page)

    // Determine how many slots we have before/after the current page
    let currentPageBeforeSize = 0
    let currentPageAfterSize = 0
    if (showPrevOverflow && showNextOverflow) {
      // We are in the middle of the set, there will be overflow (...) at both the beginning & end
      // Ex: [1] [...] [9] [10] [11] [...] [24]
      currentPageBeforeSize = Math.round((pageRangeSize - 1) / 2)
      currentPageAfterSize = pageRangeSize - currentPageBeforeSize
    } else if (showPrevOverflow) {
      // We are in the end of the set, there will be overflow (...) at the beginning
      // Ex: [1] [...] [20] [21] [22] [23] [24]
      currentPageAfterSize = totalPages - currentPage - 1 // current & last
      currentPageAfterSize = currentPageAfterSize < 0 ? 0 : currentPageAfterSize
      currentPageBeforeSize = pageRangeSize - currentPageAfterSize
    } else if (showNextOverflow) {
      // We are in the beginning of the set, there will be overflow (...) at the end
      // Ex: [1] [2] [3] [4] [5] [...] [24]
      currentPageBeforeSize = currentPage - 2 // first & current
      currentPageBeforeSize =
        currentPageBeforeSize < 0 ? 0 : currentPageBeforeSize
      currentPageAfterSize = pageRangeSize - currentPageBeforeSize
    }

    // Populate the remaining slots
    let counter = 1
    while (currentPageBeforeSize > 0) {
      // Add previous pages before the current page
      currentPageRange.unshift(currentPage - counter)
      counter++
      currentPageBeforeSize--
    }

    counter = 1
    while (currentPageAfterSize > 0) {
      // Add subsequent pages after the current page
      currentPageRange.push(currentPage + counter)
      counter++
      currentPageAfterSize--
    }

    // Add prev/next overflow indicators, and first/last pages as needed
    if (showPrevOverflow) currentPageRange.unshift('overflow')
    if (currentPage !== 1) currentPageRange.unshift(1)
    if (showNextOverflow) currentPageRange.push('overflow')
    if (currentPage !== totalPages) currentPageRange.push(totalPages)
  }

  const prevPage = !isOnFirstPage && currentPage - 1
  const nextPage = !isOnLastPage && currentPage + 1

  return (
    <nav aria-label="Pagination" className={navClasses} {...props}>
      <ul className="usa-pagination__list">
        {prevPage && (
          <li className="usa-pagination__item usa-pagination__arrow">
            <LinkTo
              href={`${pathname}?page=${prevPage}`}
              className="usa-pagination__link usa-pagination__previous-page"
              aria-label="Previous page">
              <Icon.NavigateBefore />
              <span className="usa-pagination__link-text">Previous</span>
            </LinkTo>
          </li>
        )}

        {currentPageRange.map((pageNum, i) =>
          pageNum === 'overflow' ? (
            <PaginationOverflow key={`pagination_overflow_${i}`} />
          ) : (
            <PaginationPage
              key={`pagination_page_${pageNum}`}
              page={pageNum}
              pathname={pathname}
              isCurrent={pageNum === currentPage}
            />
          )
        )}

        {nextPage && (
          <li className="usa-pagination__item usa-pagination__arrow">
            <LinkTo
              href={`${pathname}?page=${nextPage}`}
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
