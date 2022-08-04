import { Grid } from '@trussworks/react-uswds'
import React from 'react'
import { ArticleListItemRecord } from 'types'

const NewsCarouselItem = ({ article }: { article: ArticleListItemRecord }) => {
  return (
    <Grid row>
      <Grid>
        <img
          src="https://media.defense.gov/2021/Aug/23/2002905775/670/394/0/210823-F-GO452-0001.JPG"
          alt="test"
        />
      </Grid>
      <Grid>
        <h3>{article.title}</h3>
        <p>{article.preview}</p>
      </Grid>
    </Grid>
  )
}

export default NewsCarouselItem
