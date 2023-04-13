import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@trussworks/react-uswds'
import classnames from 'classnames'
import styles from './Bookmark.module.scss'
import LinkTo, { PropTypes as LinkToProps } from 'components/util/LinkTo/LinkTo'

type PropTypes = LinkToProps & {
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onEdit?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  bookmarkDescription?: string
}

const Bookmark = ({
  children,
  className,
  onDelete,
  onEdit,
  href,
  disabled,
  bookmarkDescription,
  ...linkProps
}: PropTypes) => {
  const linkClasses = classnames(
    'usa-link',
    {
      [styles.disabled]: disabled,
    },
    className
  )

  const [isDescriptionDisplayed, setDescriptionDisplayed] =
    useState<boolean>(false)

  const handleDescriptionDisplay = () => {
    if (bookmarkDescription) {
      setDescriptionDisplayed(true)
    }
  }

  return (
    <div
      className={classnames(styles.bookmark, className)}
      onMouseEnter={() => handleDescriptionDisplay()}
      onMouseLeave={() => setDescriptionDisplayed(false)}>
      {disabled ? (
        <span className={linkClasses}>{children}</span>
      ) : (
        <LinkTo
          {...linkProps}
          href={href}
          className={linkClasses}
          rel="noreferrer noopener"
          target="_blank"
          tabIndex={0}>
          {children}
          <span className="usa-sr-only">(opens in a new window)</span>
        </LinkTo>
      )}

      {bookmarkDescription && isDescriptionDisplayed && (
        <Tooltip label={bookmarkDescription}>
          <FontAwesomeIcon icon="times" />
        </Tooltip>
      )}

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className={styles.delete}
          aria-label="Remove this link">
          <FontAwesomeIcon icon="times" />
        </button>
      )}

      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className={styles.delete}
          aria-label="Edit this link">
          <FontAwesomeIcon icon="pen" />
        </button>
      )}
    </div>
  )
}

export default Bookmark
