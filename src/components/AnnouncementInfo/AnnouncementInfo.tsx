import React from 'react'
import { DocumentRenderer } from '@keystone-6/document-renderer'
import Link from 'next/link'
import styles from './AnnouncementInfo.module.scss'
import { AnnouncementRecord } from 'types'
import AnnouncementDate from 'components/AnnouncementDate/AnnouncementDate'
import { isPdf, handleOpenPdfLink } from 'helpers/openDocumentLink'

type valueObject = {
  data: {
    slug: string
    file: {
      url: string
    }
  }
}

type callToActionProps = {
  link: {
    value: valueObject | string
    discriminant: string
  }
  ctaText: string
}

const AnnouncementInfo = ({
  announcement,
}: {
  announcement: AnnouncementRecord
}) => {
  const {
    title,
    publishedDate,
    body: { document },
  } = announcement

  const componentBlockRenderers = {
    callToAction: ({
      link: { discriminant, value },
      ctaText,
    }: callToActionProps) => {
      const fileUrl = typeof value === 'object' ? value.data?.file?.url : ''
      const linkValue = typeof value === 'string' ? value : ''
      const slug = typeof value === 'object' ? value.data?.slug : ''

      return (
        <>
          {discriminant === 'article' && (
            <Link
              href={slug ? `/articles/${slug}` : '/404'}
              target="_blank"
              rel="noreferrer"
              className="usa-button">
              {ctaText}
            </Link>
          )}

          {discriminant === 'url' && (
            <Link
              href={linkValue}
              target="_blank"
              rel="noreferrer"
              className="usa-button">
              {ctaText}
            </Link>
          )}

          {discriminant === 'document' && (
            // We need to use the default Next Link component
            // with legacyBehavior=false, so we can pass in an onClick
            // that will open PDFs in the browser

            <Link
              legacyBehavior={false}
              onClick={(e) => {
                if (isPdf(fileUrl)) {
                  e.preventDefault()
                  handleOpenPdfLink(fileUrl)
                } else return
              }}
              href={fileUrl}
              rel="noreferrer"
              className="usa-button">
              {ctaText}
            </Link>
          )}
        </>
      )
    },
  }

  return (
    <div className={styles.announcementContainer}>
      <AnnouncementDate date={publishedDate} />

      <div className={styles.gridContainer}>
        <div className={styles.title}>
          <h4 className="margin-top-0 margin-bottom-1">{title}</h4>
        </div>
        <DocumentRenderer
          document={document}
          componentBlocks={componentBlockRenderers}
        />
      </div>
    </div>
  )
}

export default AnnouncementInfo
