import React from 'react'
import { Meta } from '@storybook/react'
import styles from './Typography.module.scss'

export default {
  title: 'Global/Typography',
} as Meta

export const Typography = () => {
  return (
    <div>
      <h1>Typography</h1>
      <p>Typeface: Trebuchet MS</p>
      <table className={styles.typeTable}>
        <tr>
          <td>
            <h6>40px</h6>
          </td>
          <td>
            <h1>h1: The quick brown fox jumped over the lazy dog.</h1>
          </td>
        </tr>
        <tr>
          <td>
            <h6>32px</h6>
          </td>
          <td>
            <h2>h2: The quick brown fox jumped over the lazy dog.</h2>
          </td>
        </tr>
        <tr>
          <td>
            <h6>22px</h6>
          </td>
          <td>
            <h3>h3: The quick brown fox jumped over the lazy dog.</h3>
          </td>
        </tr>
        <tr>
          <td>
            <h6>16px</h6>
          </td>
          <td>
            <h4>h4: The quick brown fox jumped over the lazy dog.</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h6>15px</h6>
          </td>
          <td>
            <h5>h5: The quick brown fox jumped over the lazy dog.</h5>
          </td>
        </tr>
        <tr>
          <td>
            <h6>13px</h6>
          </td>
          <td>
            <h6>h6: The quick brown fox jumped over the lazy dog.</h6>
          </td>
        </tr>
        <tr>
          <td>
            <h6>16px</h6>
          </td>
          <td>
            <p>p: The quick brown fox jumped over the lazy dog.</p>
          </td>
        </tr>
      </table>
    </div>
  )
}
