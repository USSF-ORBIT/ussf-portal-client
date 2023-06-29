import React, { useRef } from 'react'
import { Table, Button, Icon } from '@trussworks/react-uswds'
import type { ObjectId } from 'bson'
import styles from './ApplicationsTable.module.scss'

import type { CMSBookmark, Collection } from 'types'
import LinkTo from 'components/util/LinkTo/LinkTo'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useCloseWhenClickedOutside } from 'hooks/useCloseWhenClickedOutside'

type ApplicationsTableRowProps = {
  bookmark: CMSBookmark
  userCollectionOptions?: Collection[]
  handleAddToCollection: (b: CMSBookmark, c?: ObjectId) => void
  canAddNewCollection?: boolean
}

const ApplicationsTableRow = ({
  bookmark,
  userCollectionOptions,
  handleAddToCollection,
  canAddNewCollection,
}: ApplicationsTableRowProps) => {
  const { id, url, label, description } = bookmark
  const dropdownEl = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useCloseWhenClickedOutside(
    dropdownEl,
    false
  )

  const menuOnClick = () => {
    setIsDropdownOpen((state) => !state)
  }

  const collectionOptions = userCollectionOptions?.map((collection) => (
    <li key={`addToCollection_${collection._id}`}>
      <Button
        type="button"
        onClick={() => {
          handleAddToCollection(bookmark, collection._id)
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
                <Icon.ExpandLess aria-label="Open" />
              ) : (
                <Icon.ExpandMore aria-label="Closed" />
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

type ApplicationsTableProps = {
  bookmarks: CMSBookmark[]
  userCollectionOptions?: Collection[]
  handleAddToCollection: (b: CMSBookmark, c?: ObjectId) => void
  canAddNewCollection?: boolean
  className?: string
}

const ApplicationsTable = ({
  bookmarks,
  userCollectionOptions = [],
  handleAddToCollection,
  canAddNewCollection = true,
  className = '',
}: ApplicationsTableProps) => {
  const filterInvalidBookmarks = (b: Partial<CMSBookmark>): b is CMSBookmark =>
    !(b.id === undefined || b.url === undefined)

  return (
    <div className={className}>
      <Table striped fullWidth>
        <thead className={styles.bmListHeader}>
          <tr>
            <th scope="col">Application name</th>
            <th scope="col">Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.bmListTable}>
          {bookmarks.filter(filterInvalidBookmarks).map((b) => (
            <ApplicationsTableRow
              key={`bookmark_${b.id}`}
              bookmark={b}
              userCollectionOptions={userCollectionOptions}
              handleAddToCollection={handleAddToCollection}
              canAddNewCollection={canAddNewCollection}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ApplicationsTable
