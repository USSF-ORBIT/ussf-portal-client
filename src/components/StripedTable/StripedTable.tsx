import React from 'react'
import { Table } from '@trussworks/react-uswds'
import styles from './StripedTable.module.scss'

type StripedTable = {
  headers: string[]
  rows: Array<{ [key: string]: string }>
  keys: string[]
  title: string
}

const StripedTable = ({ headers, rows, title, keys }: StripedTable) => {
  return (
    <div className={styles.stripedTable}>
      <h1>{title}</h1>
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
          {rows.map((row) => (
            <tr key={row['DOD_ID']}>
              {keys.map((k) => {
                // eslint-disable-next-line security/detect-object-injection
                return <td key={`td_${k}`}>{row[k]}</td>
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default StripedTable
