import React, { useRef } from 'react'
import {
  Table,
  Button,
  IconExpandLess,
  IconExpandMore,
} from '@trussworks/react-uswds'

import styles from './BookmarkList.module.scss'

import type { Bookmark, BookmarkRecords, CollectionRecords } from 'types'
import LinkTo from 'components/util/LinkTo/LinkTo'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

type BookmarkListRowProps = {
  bookmark: Bookmark
  userCollectionOptions?: CollectionRecords
  handleAddToCollection: (b: Bookmark, c?: string) => void
}

const BookmarkListRow = ({
  bookmark,
  userCollectionOptions = [],
  handleAddToCollection,
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
    <li key={`addToCollection_${collection.id}`}>
      <Button
        type="button"
        onClick={() => {
          handleAddToCollection(bookmark, collection.id)
          setIsDropdownOpen(false)
        }}>
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
      <td className="text-right">
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
            }}>
            Add to new collection
          </Button>
        </DropdownMenu>
      </td>
    </tr>
  )
}

type BookmarkListProps = {
  bookmarks: BookmarkRecords
  userCollectionOptions?: CollectionRecords
  handleAddToCollection: (b: Bookmark, c?: string) => void
}

const BookmarkList = ({
  bookmarks,
  userCollectionOptions = [],
  handleAddToCollection,
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
            userCollectionOptions={userCollectionOptions}
            handleAddToCollection={handleAddToCollection}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default BookmarkList
