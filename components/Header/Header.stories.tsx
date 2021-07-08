import React from 'react'
import { Meta } from '@storybook/react'
import Header from './Header'

import styles from './Header.module.scss'

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <div className={styles.navContainer}>
        <Story />
      </div>
    ),
  ],
} as Meta

export const DefaultHeader = () => <Header />
