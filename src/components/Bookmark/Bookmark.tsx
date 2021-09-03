import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Bookmark.module.scss'
import LinkTo, { PropTypes as LinkToProps } from 'components/util/LinkTo/LinkTo'

type PropTypes = LinkToProps & {
  onDelete?: () => void
}

const Bookmark = ({ children, onDelete, ...linkProps }: PropTypes) => {
  return (
    <div className={styles.bookmark}>
      <LinkTo {...linkProps}>{children}</LinkTo>

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className={styles.delete}
          aria-label="Remove this bookmark">
          <FontAwesomeIcon icon="times" />
        </button>
      )}
    </div>
  )
}

export default Bookmark
