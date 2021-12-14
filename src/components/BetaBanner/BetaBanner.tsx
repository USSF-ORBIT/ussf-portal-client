import React from 'react'

import styles from './BetaBanner.module.scss'

import LinkTo from 'components/util/LinkTo/LinkTo'

const BetaBanner = () => (
  <div className={styles.betaBanner}>
    You are viewing a beta version of the portal.{' '}
    <LinkTo href="/leavebeta">Click here</LinkTo> to leave the beta.
  </div>
)

export default BetaBanner
