import React from 'react'
import classnames from 'classnames'
import { Icon } from '@trussworks/react-uswds'
import LinkTo from 'components/util/LinkTo/LinkTo'

type PaginationProps = {
  pages: string[] // Array of URLs for each page #
  currentPage: number // current page number (starting at 1)
  unbounded?: boolean // do we know the # of pages?
  maxSlots?: number // number of pagination "slots"
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

const PaginationPage = ({
  page,
  pageNum,
  isCurrent,
}: {
  page: string
  pageNum: number
  isCurrent?: boolean
}) => {
  const linkClasses = classnames('usa-pagination__button', {
    'usa-current': isCurrent,
  })

  return (
    <li
      key={`pagination_page_${pageNum}`}
      className="usa-pagination__item usa-pagination__page-no">
      <LinkTo
        href={page}
        className={linkClasses}
        aria-label={`Page ${pageNum}`}>
        {pageNum}
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
  pages,
  currentPage,
  unbounded = false,
  className,
  maxSlots = 7,
  ...props
}: PaginationProps & JSX.IntrinsicElements['nav']) => {
  const navClasses = classnames('usa-pagination', className)

  const isOnFirstPage = currentPage === 1
  const isOnLastPage = currentPage === pages.length

  const showOverflow = pages.length > maxSlots // If more pages than slots, use overflow indicator(s)

  const middleSlot = Math.round(maxSlots / 2) // 4 if maxSlots is 7
  const showPrevOverflow = showOverflow && currentPage > middleSlot
  const showNextOverflow =
    showOverflow && pages.length - currentPage >= middleSlot

  const prevSlots = isOnFirstPage ? 0 : showPrevOverflow ? 2 : 1 // first page, prev overflow
  const nextSlots = isOnLastPage ? 0 : showNextOverflow ? 2 : 1 // next overflow, last page
  const pageRangeSize = maxSlots - 1 - (prevSlots + nextSlots) // minus one for the current page

  // Populate the remaining slots
  let currentPageBeforeSize = 0
  let currentPageAfterSize = 0
  if (showPrevOverflow && showNextOverflow) {
    currentPageBeforeSize = Math.round((pageRangeSize - 1) / 2)
    currentPageAfterSize = pageRangeSize - currentPageBeforeSize
  } else if (showPrevOverflow) {
    currentPageAfterSize = pages.length - currentPage - 1 // current & last
    currentPageAfterSize = currentPageAfterSize < 0 ? 0 : currentPageAfterSize
    currentPageBeforeSize = pageRangeSize - currentPageAfterSize
  } else if (showNextOverflow) {
    currentPageBeforeSize = currentPage - 2 // first & current
    currentPageBeforeSize =
      currentPageBeforeSize < 0 ? 0 : currentPageBeforeSize
    currentPageAfterSize = pageRangeSize - currentPageBeforeSize
  }

  const currentPageRange: Array<number | 'overflow'> = [currentPage] // Start from the current page
  let counter = 1
  while (currentPageBeforeSize > 0) {
    currentPageRange.unshift(currentPage - counter)
    counter++
    currentPageBeforeSize--
  }

  counter = 1
  while (currentPageAfterSize > 0) {
    currentPageRange.push(currentPage + counter)
    counter++
    currentPageAfterSize--
  }

  if (showPrevOverflow) currentPageRange.unshift('overflow')
  if (currentPage !== 1) currentPageRange.unshift(1)
  if (showNextOverflow) currentPageRange.push('overflow')
  if (currentPage !== pages.length) currentPageRange.push(pages.length)

  console.log('pages', currentPageRange)

  const pageItems = !showOverflow
    ? pages.map((p, i) => (
        <PaginationPage
          key={`pagination_page_${i + 1}`}
          page={p}
          pageNum={i + 1}
          isCurrent={i + 1 === currentPage}
        />
      ))
    : currentPageRange.map((pageNum, i) =>
        pageNum === 'overflow' ? (
          <PaginationOverflow key={`pagination_overflow_${i}`} />
        ) : (
          <PaginationPage
            key={`pagination_page_${pageNum}`}
            pageNum={pageNum}
            page={pages[pageNum - 1]}
            isCurrent={pageNum === currentPage}
          />
        )
      )

  const prevPage = !isOnFirstPage && pages[currentPage - 2]
  const nextPage = !isOnLastPage && pages[currentPage]

  return (
    <nav aria-label="Pagination" className={navClasses} {...props}>
      <ul className="usa-pagination__list">
        {prevPage && (
          <li className="usa-pagination__item usa-pagination__arrow">
            <LinkTo
              href={prevPage}
              className="usa-pagination__link usa-pagination__previous-page"
              aria-label="Previous page">
              <Icon.NavigateBefore />
              <span className="usa-pagination__link-text">Previous</span>
            </LinkTo>
          </li>
        )}

        {pageItems}

        {nextPage && (
          <li className="usa-pagination__item usa-pagination__arrow">
            <LinkTo
              href={nextPage}
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
