import React from 'react'
import { Table } from '@trussworks/react-uswds'
import styles from './GuardianDirectoryTable.module.scss'
import { SearchBanner } from 'components/SearchBanner/SearchBanner'

type GuardianDirectoryTableProps = {
  headers: string[]
  rows: Array<{ [key: string]: string }>
  keys: string[]
}

export const GuardianDirectoryTable = ({
  headers,
  rows,
  keys,
}: GuardianDirectoryTableProps) => {
  if (rows.length === 0) {
    // no results
    return (
      <SearchBanner icon={<img src="/assets/images/moon-flag.svg" alt=" " />}>
        <div>
          <h3>There are no results that match that query.</h3>
          <p>
            It seems you didn’t find what you were looking for. Please search
            again with different keywords.
          </p>
        </div>
      </SearchBanner>
    )
  }

  return (
    <div
      data-testid="guardian-directory-table"
      className={styles.guardianDirectoryTable}>
      <Table striped fullWidth>
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope="col" key={`header_${header}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, id) => (
            <tr data-testid={id} key={id}>
              {keys.map((k) => {
                // eslint-disable-next-line security/detect-object-injection
                const rowValue = row[k]

                return (
                  <td data-testid={`${id}_${k}`} key={`td_${k}`}>
                    {rowValue}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
