import React from 'react'
import { Table } from '@trussworks/react-uswds'

import type { Bookmark, BookmarkRecords } from 'types'
import LinkTo from 'components/util/LinkTo/LinkTo'

const BookmarkList = ({ bookmarks }: { bookmarks: BookmarkRecords }) => {
  const filterInvalidBookmarks = (b: Partial<Bookmark>): b is Bookmark =>
    !(b.id === undefined || b.url === undefined)

  return (
    <Table striped fullWidth>
      <thead>
        <tr>
          <th scope="col">Application name</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        {bookmarks.filter(filterInvalidBookmarks).map((b) => {
          const { id, url, label, description } = b

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
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default BookmarkList
