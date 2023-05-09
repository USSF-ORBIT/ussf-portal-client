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
import LinkTo from 'components/util/LinkTo/LinkTo'

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
            <Category category={CONTENT_CATEGORIES.NEWS} />
          ) : (
            <Tag className={`${tagStyles.Category}`}>{category}</Tag>
          )}
          {labels &&
            labels.map((label) => {
              return (
                <LinkTo
                  href={`/search?q=label%3A` + label.name}
                  key={`${label.id}`}>
                  <Label type={label.type}>{label.name}</Label>
                </LinkTo>
              )
            })}
          {tags &&
            tags.map((tag) => {
              return (
                <LinkTo href={`/search?q=tag%3A` + tag.name} key={`${tag.id}`}>
                  <Tag background={colors['theme-mars-darker']}>{tag.name}</Tag>
                </LinkTo>
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
