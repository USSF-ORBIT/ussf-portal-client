import { Grid } from '@trussworks/react-uswds'
import React from 'react'
import styles from './GuardianIdealItem.module.scss'
import { ArticleListItemRecord } from 'types'
import { Category } from 'components/Tag/Tag'
import { CONTENT_CATEGORIES } from 'constants/index'

const GuardianIdealItem = ({ article }: { article: ArticleListItemRecord }) => {
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
          <Category category={CONTENT_CATEGORIES.GUARDIANIDEAL} />
          <h1 className={styles.articleTitle}>{article.title}</h1>
          <div className={styles.articlePreview}>{article.preview}</div>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GuardianIdealItem
