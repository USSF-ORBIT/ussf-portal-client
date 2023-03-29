import React from 'react'
import { DocumentRenderer } from '@keystone-6/document-renderer'
import { InferRenderersForComponentBlocks } from '@keystone-6/fields-document/component-blocks'
import { Tag } from '@trussworks/react-uswds'
import tagStyles from '../Tag/Tag.module.scss'
import styles from './SingleArticle.module.scss'
import { componentBlocks } from 'components/ComponentBlocks/embedVideo'
import { Category, Label } from 'components/Tag/Tag'
import type { ArticleRecord } from 'types'
import { CONTENT_CATEGORIES } from 'constants/index'
import colors from 'styles/sfds/colors.module.scss'
import { isPublished, getYouTubeEmbedId } from 'helpers/index'

export const SingleArticle = ({ article }: { article: ArticleRecord }) => {
  const {
    title,
    category,
    publishedDate,
    hero,
    body: { document },
    byline,
    location,
    labels,
    tags,
  } = article

  const dateFormatter = new Intl.DateTimeFormat('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
  const publishedDateObj = new Date(publishedDate)

  const componentBlockRenderers: InferRenderersForComponentBlocks<
    typeof componentBlocks
  > = {
    embedVideo: (props: any) => {
      // We are receiving a YouTube link from the CMS, so we need to parse the embedId
      const embedId = getYouTubeEmbedId(props.link)
      return (
        <>
          {props.videoTitle && <h2>{props.videoTitle}</h2>}
          {props.link && (
            <iframe
              title={props.videoTitle}
              width="420"
              height="315"
              src={`https://youtube.com/embed/${embedId}`}></iframe>
          )}
        </>
      )
    },
  }

  return (
    <article className={styles.SingleArticle}>
      {!isPublished(article) && (
        <h2 className={styles.previewBanner}>Unpublished Article Preview</h2>
      )}
      <div>
        {hero && (
          <img
            src={hero.url}
            alt="article hero graphic"
            className={styles.hero}
          />
        )}
        <h2>{title}</h2>
        <div className={styles.tagAndLabelContainer}>
          {category === 'InternalNews' ? (
            <Category category={CONTENT_CATEGORIES.INTERNAL_NEWS} />
          ) : (
            <Tag className={`${tagStyles.Category}`}>{category}</Tag>
          )}

          {labels &&
            labels.map((label) => {
              return (
                <Label type={label.type} key={`${label.id}`}>
                  {label.name}
                </Label>
              )
            })}

          {tags &&
            tags.map((tag) => {
              return (
                <Tag key={`${tag.id}`} background={colors['theme-mars-base']}>
                  {tag.name}
                </Tag>
              )
            })}
        </div>

        <dl className={styles.metadata}>
          <div>
            <dt>Post date:</dt>
            <dd>
              <time dateTime={publishedDateObj.toLocaleString()}>
                {dateFormatter.format(publishedDateObj)}
              </time>
            </dd>
          </div>

          {byline && (
            <div>
              <dt>Written by:</dt>
              <dd>{byline.name}</dd>
            </div>
          )}

          {location && (
            <div>
              <dt>Posted from:</dt>
              <dd>{location.name}</dd>
            </div>
          )}
        </dl>
      </div>
      <DocumentRenderer
        document={document}
        componentBlocks={componentBlockRenderers}
      />
    </article>
  )
}
