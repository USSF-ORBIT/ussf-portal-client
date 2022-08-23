import { Grid } from '@trussworks/react-uswds'
import React from 'react'
import styles from './NewsCarouselItem.module.scss'
import { ArticleListItemRecord } from 'types'
import LinkTo from 'components/util/LinkTo/LinkTo'

const NewsCarouselItem = ({ article }: { article: ArticleListItemRecord }) => {
  return (
    <Grid row className={styles.carouselItemContainer}>
      <Grid col={5} className={styles.imageContainer}>
        {/* 
        TODO: current image is a placeholder. Will need to add a check 
        for determining if the article has an image.
        */}
        <img
          src="/assets/images/Seal_of_the_United_States_Space_Force.svg"
          alt="USSF logo"
          className={styles.carouselImage}
        />
      </Grid>
      <Grid col={'fill'} className={styles.gridContainer}>
        <Grid className={styles.textContainer}>
          <h1 className={styles.articleTitle}>{article.title}</h1>
          <div className={styles.articlePreview}>{article.preview}</div>
          <LinkTo
            href={`/articles/${article.slug}`}
            target="_blank"
            rel="noreferrer"
            className="usa-button">
            View Article
          </LinkTo>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NewsCarouselItem
