import React from 'react'
import { Table } from '@trussworks/react-uswds'
import styles from './StripedTable.module.scss'

type StripedTableProps = {
  headers: string[]
  rows: Array<{ [key: string]: string }>
  keys: string[]
}

export const StripedTable = ({ headers, rows, keys }: StripedTableProps) => {
  return (
    <div className={styles.stripedTable}>
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
            <tr data-testid={id} key={row['DOD_ID']}>
              {keys.map((k) => {
                // eslint-disable-next-line security/detect-object-injection
                return <td data-testid={`${id}_${k}`} key={`td_${k}`}>{row[k]}</td>
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
