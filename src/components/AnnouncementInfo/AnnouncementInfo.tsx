import React from 'react'
import { DocumentRenderer } from '@keystone-6/document-renderer'
import { InferRenderersForComponentBlocks } from '@keystone-6/fields-document/component-blocks'
import styles from './AnnouncementInfo.module.scss'
import { componentBlocks } from 'components/ComponentBlocks/component-blocks'
import { AnnouncementRecord } from 'types'
import LinkTo from 'components/util/LinkTo/LinkTo'

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
      return (
        <>
          {props.link.discriminant === 'article' && (
            <LinkTo
              href={
                props.link.value.data.slug
                  ? `/articles/${props.link.value.data.slug}`
                  : '/'
              }
              target="_blank"
              rel="noreferrer"
              className="usa-button">
              {props.ctaText}
            </LinkTo>
          )}

          {props.link.discriminant === 'url' && (
            <LinkTo
              href={props.link.value}
              target="_blank"
              rel="noreferrer"
              className="usa-button">
              {props.ctaText}
            </LinkTo>
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

      <div className={styles.gridContainer}>
        <p className={styles.title}>
          <strong>{title}</strong>
        </p>
        <DocumentRenderer
          document={document}
          componentBlocks={componentBlockRenderers}
        />
      </div>
    </div>
  )
}

export default AnnouncementInfo
