import { Grid } from '@trussworks/react-uswds'
import React from 'react'
import Link from 'next/link'
import styles from './NewsCarouselItem.module.scss'
import { ArticleListItemRecord } from 'types'

const NewsCarouselItem = ({ article }: { article: ArticleListItemRecord }) => {
  return (
    <Grid row className={styles.carouselItemContainer}>
      <Grid col={5} className={styles.imageContainer}>
        {article.hero ? (
          <img
            src={article.hero.url}
            alt="article hero graphic"
            className={styles.hero}
          />
        ) : (
          <img
            src="/assets/images/Seal_of_the_United_States_Space_Force.svg"
            alt="USSF logo"
            className={styles.ussfLogo}
          />
        )}
      </Grid>
      <Grid col={'fill'} className={styles.gridContainer}>
        <Grid className={styles.textContainer}>
          <h1 className={styles.articleTitle}>{article.title}</h1>
          <div className={styles.articlePreview}>{article.preview}</div>
          <Link
            href={`/articles/${article.slug}`}
            target="_blank"
            rel="noreferrer"
            className="usa-button">
            View Article
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NewsCarouselItem
