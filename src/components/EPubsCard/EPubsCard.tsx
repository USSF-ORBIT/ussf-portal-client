import React from 'react'
import styles from './EPubsCard.module.scss'
import LinkTo from 'components/util/LinkTo/LinkTo'

type PropTypes = {
  query?: string
  title?: string
}

const EPubsCard = ({ query, title = 'Looking for a form?' }: PropTypes) => {
  const ePubsSearch = query
    ? `https://search.usa.gov/search?affiliate=afpw_epubs&query=${query}`
    : 'https://search.usa.gov/search?affiliate=afpw_epubs'

  return (
    <div className={styles.epubs}>
      <h3>{title}</h3>
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
