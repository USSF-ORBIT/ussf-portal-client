import { Grid } from '@trussworks/react-uswds'
import React from 'react'
import styles from './NewsCarouselItem.module.scss'
import { ArticleListItemRecord } from 'types'
import LinkTo from 'components/util/LinkTo/LinkTo'

const NewsCarouselItem = ({ article }: { article: ArticleListItemRecord }) => {
  return (
    <Grid row col="auto">
      <Grid col={5}>
        <img
          src="https://media.defense.gov/2021/Aug/23/2002905775/670/394/0/210823-F-GO452-0001.JPG"
          alt="test"
        />
      </Grid>
      <Grid col={7}>
        <div className={styles.textContainer}>
          <h1>{article.title}</h1>
          <div>{article.preview}</div>
          <LinkTo
            href={`/articles/${article.slug}`}
            target="_blank"
            rel="noreferrer"
            className="usa-button">
            View Full Announcement
          </LinkTo>
        </div>
      </Grid>
    </Grid>
  )
}

export default NewsCarouselItem
