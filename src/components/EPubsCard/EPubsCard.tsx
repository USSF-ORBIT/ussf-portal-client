import React from 'react'
import styles from './EPubsCard.module.scss'
import LinkTo from 'components/util/LinkTo/LinkTo'

type PropTypes = {
  query: string
}

const EPubsCard = ({ query }: PropTypes) => {
  const ePubsSearch = `https://search.usa.gov/search?affiliate=afpw_epubs&query=${query}`

  return (
    <div className={styles.epubs}>
      <h3>Looking for a form?</h3>
      <p>Launch your query on ePubs!</p>
      <LinkTo
        href={ePubsSearch}
        target="_blank"
        rel="noreferrer noopener"
        className="usa-button">
        Search ePubs
      </LinkTo>
    </div>
  )
}

export default EPubsCard
