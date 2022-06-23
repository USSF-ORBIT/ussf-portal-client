import React from 'react'
import { DocumentRenderer } from '@keystone-6/document-renderer'
import { InferRenderersForComponentBlocks } from '@keystone-6/fields-document/component-blocks'
import styles from './AnnouncementInfo.module.scss'
import { componentBlocks } from 'components/ComponentBlocks/component-blocks'
import { AnnouncementRecord } from 'types'

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

  const componentBlockRenderers: InferRenderersForComponentBlocks<
    typeof componentBlocks
  > = {
    callToAction: (props: any) => {
      const { ctaText, link } = props
      // const {
      //   link: { value },
      // }: HydratedRelationshipData = props
      return (
        <>
          {link.discriminant === 'article' && (
            <a
              href={
                link.value?.data.slug
                  ? `/articles/${link.value?.data.slug}`
                  : '/'
              }
              target="_blank"
              rel="noreferrer"
              className="usa-button">
              {ctaText}
            </a>
          )}

          {link.discriminant === 'url' && (
            <a
              href={link.value}
              target="_blank"
              rel="noreferrer"
              className="usa-button">
              {ctaText}
            </a>
          )}
        </>
      )
    },
  }

  const dateFormatter = new Intl.DateTimeFormat('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  })
  const publishedDateObj = new Date(publishedDate)

  return (
    <div className={styles.announcementContainer}>
      <time className={styles.date} dateTime={publishedDate?.toLocaleString()}>
        {dateFormatter.format(publishedDateObj)}
      </time>

      <div className={styles.divider} />

      <div className={styles.gridContainer}>
        <label className={styles.title}>{title}</label>
        <DocumentRenderer
          document={document}
          componentBlocks={componentBlockRenderers}
        />
      </div>
    </div>
  )
}

export default AnnouncementInfo
