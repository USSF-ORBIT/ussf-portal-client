import React from 'react'
import { DocumentRenderer } from '@keystone-6/document-renderer'
import { InferRenderersForComponentBlocks } from '@keystone-6/fields-document/component-blocks'
import styles from './AnnouncementInfo.module.scss'
import type { componentBlocks } from 'components/ComponentBlocks/callToAction'
import { AnnouncementRecord } from 'types'
import Link from 'next/link'
import LinkTo from 'components/util/LinkTo/LinkTo'
import AnnouncementDate from 'components/AnnouncementDate/AnnouncementDate'
import { handleOpenPdfLink } from 'helpers/openDocumentLink'

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
                props.link.value.data?.slug
                  ? `/articles/${props.link.value.data.slug}`
                  : '/404'
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

          {props.link.discriminant === 'document' && (
            // We need to use the default Next Link component
            // with legacyBehavior=false, so we can pass in an onClick
            // that will open PDFs in the browser

            <Link
              legacyBehavior={false}
              onClick={(e) => {
                e.preventDefault()
                handleOpenPdfLink(props.link.value.data?.file?.url)
              }}
              href={props.link.value.data?.file?.url}
              rel="noreferrer"
              className="usa-button">
              {props.ctaText}
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
