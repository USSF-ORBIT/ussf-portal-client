import React, { useRef } from 'react'
import {
  Table,
  Button,
  IconExpandLess,
  IconExpandMore,
} from '@trussworks/react-uswds'

import type { Bookmark, BookmarkRecords } from 'types'
import LinkTo from 'components/util/LinkTo/LinkTo'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

type BookmarkListRowProps = {
  bookmark: Bookmark
  handleAddToNewCollection: () => void
}

const BookmarkListRow = ({
  bookmark,
  handleAddToNewCollection,
}: BookmarkListRowProps) => {
  const { id, url, label, description } = bookmark
  const dropdownEl = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useCloseWhenClickedOutside(
    dropdownEl,
    false
  )

  const menuOnClick = () => {
    setIsDropdownOpen((state) => !state)
  }

  return (
    <tr key={`bookmark_${id}`}>
      <th scope="row">
        <LinkTo
          href={url}
          className="usa-link"
          target="_blank"
          rel="noreferrer noopener">
          {label}
          <span className="usa-sr-only">(opens in a new window)</span>
        </LinkTo>
      </th>
      <td>{description}</td>
      <td>
        <DropdownMenu
          toggleEl={
            <Button unstyled type="button" onClick={menuOnClick}>
              Add to My Space{' '}
              {isDropdownOpen ? <IconExpandLess /> : <IconExpandMore />}
            </Button>
          }
          isActive={isDropdownOpen}
          dropdownRef={dropdownEl}>
          <Button type="button" onClick={handleAddToNewCollection}>
            Add to new collection
          </Button>
        </DropdownMenu>
      </td>
    </tr>
  )
}

type BookmarkListProps = {
  bookmarks: BookmarkRecords
  handleAddToNewCollection: (b: Bookmark) => void
}

const BookmarkList = ({
  bookmarks,
  handleAddToNewCollection,
}: BookmarkListProps) => {
  const filterInvalidBookmarks = (b: Partial<Bookmark>): b is Bookmark =>
    !(b.id === undefined || b.url === undefined)

  return (
    <Table striped fullWidth>
      <thead>
        <tr>
          <th scope="col">Application name</th>
          <th scope="col">Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {bookmarks.filter(filterInvalidBookmarks).map((b) => (
          <BookmarkListRow
            key={`bookmark_${b.id}`}
            bookmark={b}
            handleAddToNewCollection={() => {
              handleAddToNewCollection(b)
            }}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default BookmarkList
