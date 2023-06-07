import React from 'react'
import { DocumentRenderer } from '@keystone-6/document-renderer'
import { InferRenderersForComponentBlocks } from '@keystone-6/fields-document/component-blocks'
import styles from './AnnouncementInfo.module.scss'
import { componentBlocks } from 'components/ComponentBlocks/callToAction'
import { AnnouncementRecord } from 'types'
import LinkTo from 'components/util/LinkTo/LinkTo'
import AnnouncementDate from 'components/AnnouncementDate/AnnouncementDate'

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
