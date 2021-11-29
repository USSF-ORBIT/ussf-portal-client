import React from 'react'

import styles from './FeedbackCard.module.scss'

const FEEDBACK_EMAIL = 'feedback@ussforbit.us'
const FEEDBACK_SUBJECT = 'USSF portal feedback'

const FeedbackCard = () => (
  <div className={styles.FeedbackCard}>
    <h3>Got feedback?</h3>
    <p>
      We’d love to hear it! Contact us through this form or schedule an
      interview.
    </p>
    <a
      href={`mailto:${FEEDBACK_EMAIL}?subject=${FEEDBACK_SUBJECT}`}
      target="_blank"
      rel="noreferrer noopener"
      className="usa-button">
      Send us feedback
    </a>
  </div>
)

export default FeedbackCard
