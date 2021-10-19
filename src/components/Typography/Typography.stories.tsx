import React from 'react'
import { Meta } from '@storybook/react'
import styles from './Typography.module.scss'

export default {
  title: 'Components/Typography',
} as Meta

export const Typography = () => {
  return (
    <div className="">
      <h1 className="">Typography</h1>
      <p className="">Typeface: Trebuchet</p>
      <table className={styles.typeTable}>
        <tr>
          <td>
            <h6>42px / 2.625rem / 0</h6>
          </td>
          <td>
            <h1>h1: The quick brown fox jumped over the lazy dog.</h1>
          </td>
        </tr>
        <tr>
          <td>
            <h6>32px / 2rem / 0</h6>
          </td>
          <td>
            <h2 className="">
              h2: The quick brown fox jumped over the lazy dog.
            </h2>
          </td>
        </tr>
        <tr>
          <td>
            <h6 className="">22px / 1.375rem / 0</h6>
          </td>
          <td>
            <h3 className="">
              h3: The quick brown fox jumped over the lazy dog.
            </h3>
          </td>
        </tr>
        <tr>
          <td>
            <h6 className="">16px / 1rem / 0</h6>
          </td>
          <td>
            <h4 className="">
              h4: The quick brown fox jumped over the lazy dog.
            </h4>
          </td>
        </tr>
        <tr>
          <td>
            <h6 className="">15px / 0.9375rem / 0</h6>
          </td>
          <td>
            <h5 className="">
              h5: The quick brown fox jumped over the lazy dog.
            </h5>
          </td>
        </tr>
        <tr>
          <td>
            <h6 className="">13px / 0.8125rem / 0</h6>
          </td>
          <td>
            <h6 className="">
              h6: The quick brown fox jumped over the lazy dog.
            </h6>
          </td>
        </tr>
        <tr>
          <td>
            <h6 className="">16px / 1rem / 0</h6>
          </td>
          <td>
            <p className="">
              body1: The quick brown fox jumped over the lazy dog.
            </p>
          </td>
        </tr>
      </table>
    </div>
  )
}
