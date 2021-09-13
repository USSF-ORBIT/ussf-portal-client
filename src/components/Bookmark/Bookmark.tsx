import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import styles from './Bookmark.module.scss'
import LinkTo, { PropTypes as LinkToProps } from 'components/util/LinkTo/LinkTo'

type PropTypes = LinkToProps & {
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Bookmark = ({
  children,
  className,
  onDelete,
  href,
  ...linkProps
}: PropTypes) => {
  const linkClasses = classnames('usa-link', className)

  return (
    <div className={styles.bookmark}>
      <LinkTo
        {...linkProps}
        href={href}
        className={linkClasses}
        rel="noreferrer noopener"
        target="_blank">
        {children}
        <span className="usa-sr-only">(opens in a new window)</span>
      </LinkTo>

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
