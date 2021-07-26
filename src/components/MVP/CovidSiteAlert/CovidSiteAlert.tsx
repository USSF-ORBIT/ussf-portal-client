import React from 'react'
import { SiteAlert } from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import styles from './CovidSiteAlert.module.scss'

const CovidSiteAlert = () => {
  return (
    <SiteAlert
      variant="info"
      showIcon={false}
      className={`${styles.covidSiteAlert}`}>
      <FontAwesomeIcon icon={faArrowRight} className="margin-right-1" />

      <p className="line-height-sans-3 margin-y-0 text-ink">
        Our response to COVID-19 is rapidly evolving. Always check your
        installation for local guidance. Read{' '}
        <a
          className="text-ink"
          href="https://www.af.mil/News/Coronavirus-Disease-2019/">
          general guidance from the Air Force
        </a>
        .
      </p>
    </SiteAlert>
  )
}

export default CovidSiteAlert
