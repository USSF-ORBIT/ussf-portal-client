import React from 'react'

import styles from './FeedbackCard.module.scss'

import { useAnalytics } from 'stores/analyticsContext'

const FEEDBACK_EMAIL = 'feedback@ussforbit.us'
const FEEDBACK_SUBJECT = 'USSF portal feedback'

const FeedbackCard = () => {
  const { trackEvent } = useAnalytics()

  return (
    <div className={styles.FeedbackCard}>
      <h2>Got feedback?</h2>
      <p>
        We’d love to hear it! Contact us at{' '}
        <a
          href={`mailto:${FEEDBACK_EMAIL}?subject=${FEEDBACK_SUBJECT}`}
          target="_blank"
          rel="noreferrer noopener"
          className="usa-link"
          onClick={() => trackEvent('Feedback', FEEDBACK_EMAIL)}>
          {FEEDBACK_EMAIL}
        </a>{' '}
        to send us your thoughts or schedule an interview.
      </p>
      <a
        href={`mailto:${FEEDBACK_EMAIL}?subject=${FEEDBACK_SUBJECT}`}
        target="_blank"
        rel="noreferrer noopener"
        className="usa-button"
        onClick={() => trackEvent('Feedback', 'Send us feedback')}>
        Send us feedback
      </a>
    </div>
  )
}

export default FeedbackCard
