import { Grid } from '@trussworks/react-uswds'
import React from 'react'
import styles from './GuardianIdealItem.module.scss'
import { IdealListItem } from 'types'
import { Category } from 'components/Tag/Tag'
import { CONTENT_CATEGORIES } from 'constants/index'

const GuardianIdealItem = ({ ideal }: { ideal: IdealListItem }) => {
  return (
    <Grid row className={styles.carouselItemContainer}>
      <Grid col={5} className={styles.imageContainer}>
        {ideal.hero ? (
          <img
            src={ideal.hero.url}
            alt="guardian ideal hero graphic"
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
          <h4 className={styles.guardianIdealTitle}>{ideal.title}</h4>
          <div className={styles.guardianIdealBody}>{ideal.body}</div>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GuardianIdealItem
