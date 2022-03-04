import React, { useRef } from 'react'
import {
  Table,
  Button,
  IconExpandLess,
  IconExpandMore,
} from '@trussworks/react-uswds'

import styles from './BookmarkList.module.scss'

import type { BookmarkRecord, BookmarkRecords, Collection } from 'types'
import LinkTo from 'components/util/LinkTo/LinkTo'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

type BookmarkListRowProps = {
  bookmark: BookmarkRecord
  userCollectionOptions?: Collection[]
  handleAddToCollection: (b: BookmarkRecord, c?: string) => void
  canAddNewCollection?: boolean
}

const BookmarkListRow = ({
  bookmark,
  userCollectionOptions = [],
  handleAddToCollection,
  canAddNewCollection = true,
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

  const collectionOptions = userCollectionOptions.map((collection) => (
    <li key={`addToCollection_${collection._id}`}>
      <Button
        type="button"
        onClick={() => {
          handleAddToCollection(bookmark, `${collection._id}`)
          setIsDropdownOpen(false)
        }}
        disabled={
          collection.bookmarks.filter((b) => !b.isRemoved).length >= 10
        }>
        {collection.title || 'Untitled Collection'}
      </Button>
    </li>
  ))

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
      <td className={styles.bookmarkAction}>
        <DropdownMenu
          toggleEl={
            <Button unstyled type="button" onClick={menuOnClick}>
              Add to My Space{' '}
              {isDropdownOpen ? (
                <IconExpandLess aria-label="Open" />
              ) : (
                <IconExpandMore aria-label="Closed" />
              )}
            </Button>
          }
          align="right"
          isActive={isDropdownOpen}
          dropdownRef={dropdownEl}>
          <ol className={styles.collectionOptions}>{collectionOptions}</ol>
          <Button
            type="button"
            onClick={() => {
              handleAddToCollection(bookmark)
              setIsDropdownOpen(false)
            }}
            disabled={!canAddNewCollection}>
            Add to new collection
          </Button>
        </DropdownMenu>
      </td>
    </tr>
  )
}

type BookmarkListProps = {
  bookmarks: BookmarkRecords
  userCollectionOptions?: Collection[]
  handleAddToCollection: (b: BookmarkRecord, c?: string) => void
  canAddNewCollection?: boolean
}

const BookmarkList = ({
  bookmarks,
  userCollectionOptions = [],
  handleAddToCollection,
  canAddNewCollection = true,
}: BookmarkListProps) => {
  const filterInvalidBookmarks = (
    b: Partial<BookmarkRecord>
  ): b is BookmarkRecord => !(b.id === undefined || b.url === undefined)

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
            userCollectionOptions={userCollectionOptions}
            handleAddToCollection={handleAddToCollection}
            canAddNewCollection={canAddNewCollection}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default BookmarkList
