import React from 'react'
import { Table } from '@trussworks/react-uswds'
import styles from './GuardianDirectoryTable.module.scss'

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

                if (k === 'DutyTitle') {
                  return (
                    <td data-testid={`${id}_${k}`} key={`td_${k}`}>
                      {rowValue.toUpperCase()}
                    </td>
                  )
                }

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
