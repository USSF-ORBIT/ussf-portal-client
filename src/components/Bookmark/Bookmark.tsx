import React, { useState } from 'react'
import Link, { LinkProps } from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@trussworks/react-uswds'
import classnames from 'classnames'
import styles from './Bookmark.module.scss'

type PropTypes = LinkProps & {
  children: React.ReactNode
  className?: string
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onEdit?: (event: React.MouseEvent<HTMLButtonElement>) => void
  label?: string
  disabled?: boolean
  bookmarkDescription?: string
}

const Bookmark = ({
  children,
  className,
  onDelete,
  onEdit,
  href,
  label,
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
        <Link
          {...linkProps}
          href={href}
          className={linkClasses}
          rel="noreferrer noopener"
          target="_blank"
          tabIndex={0}
          onFocus={() => {
            setDescriptionDisplayed(true)
          }}>
          {children}
          <span className="usa-sr-only">(opens in a new window)</span>
        </Link>
      )}

      {bookmarkDescription && isDescriptionDisplayed && (
        <Tooltip label={bookmarkDescription}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z"
              fill="currentColor"
            />
          </svg>
        </Tooltip>
      )}

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className={styles.delete}
          aria-label={`remove ${label || href} from collection`}
          onFocus={() => {
            setDescriptionDisplayed(false)
          }}>
          <FontAwesomeIcon icon="times" />
        </button>
      )}

      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className={styles.delete}
          aria-label={`edit ${label || href} bookmark`}>
          <FontAwesomeIcon icon="pen" />
        </button>
      )}
    </div>
  )
}

export default Bookmark
