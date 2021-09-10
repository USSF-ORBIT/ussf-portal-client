import React from 'react'
import { Table } from '@trussworks/react-uswds'

import type { Bookmark } from 'types'
import LinkTo from 'components/util/LinkTo/LinkTo'

const BookmarkList = ({ bookmarks }: { bookmarks: Bookmark[] }) => {
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
