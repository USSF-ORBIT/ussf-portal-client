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
      const { ctaText } = props
      const {
        link: { value },
      }: HydratedRelationshipData = props
      return (
        <>
          {ctaText && (
            <a
              href={value?.data.slug ? `/articles/${value?.data.slug}` : '/'}
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
  })

  const publishedDateObj = new Date(publishedDate)

  return (
    <div className={styles.announcementContainer}>
      <time
        className={styles.date}
        dateTime={publishedDateObj.toLocaleString()}>
        {dateFormatter.format(publishedDateObj)}
      </time>

      <hr className={styles.divider} />

      <div>
        <label className={styles.title}>{title}</label>
        <div className={styles.innerContainer}>
          <DocumentRenderer
            document={document}
            componentBlocks={componentBlockRenderers}
          />
        </div>
      </div>
    </div>
  )
}

export default AnnouncementInfo
