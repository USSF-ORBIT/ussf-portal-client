import React from 'react'
import { Table } from '@trussworks/react-uswds'

import type { BookmarkRecords } from 'types'
import LinkTo from 'components/util/LinkTo/LinkTo'

const BookmarkList = ({ bookmarks }: { bookmarks: BookmarkRecords }) => {
  return (
    <Table striped fullWidth>
      <thead>
        <tr>
          <th scope="col">Application name</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        {bookmarks.map((b) => {
          if (b.id === undefined || b.url === undefined) {
            // TODO - error, invalid bookmark since these fields are required
            return <></>
          }

          const { id, url, label, description } = b

          return (
            <tr key={`bookmark_${id}`}>
              <th scope="row">
                <LinkTo href={url} className="usa-link">
                  {label}
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
