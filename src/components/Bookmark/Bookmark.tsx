import React from 'react'
import styles from './Bookmark.module.scss'
import LinkTo, { PropTypes as LinkToProps } from 'components/util/LinkTo/LinkTo'

type PropTypes = LinkToProps

const Bookmark = ({ children, ...linkProps }: PropTypes) => {
  return (
    <div className={styles.bookmark}>
      <LinkTo {...linkProps}>{children}</LinkTo>
    </div>
  )
}

export default Bookmark
