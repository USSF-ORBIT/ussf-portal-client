import React from 'react'

import { useAnalytics } from 'stores/analyticsContext'

const FEEDBACK_EMAIL = 'feedback@ussforbit.us'
const FEEDBACK_SUBJECT = 'USSF portal feedback'

const FeedbackCard = () => {
  const { trackEvent } = useAnalytics()

  return (
    <div>
      <h3>Got Feedback?</h3>
      <p>
        We’d love to hear it! Contact us at{' '}
        <a
          href={`mailto:${FEEDBACK_EMAIL}?subject=${FEEDBACK_SUBJECT}`}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => trackEvent('Feedback', FEEDBACK_EMAIL)}>
          {FEEDBACK_EMAIL}
        </a>{' '}
        to send us your thoughts or schedule an interview.
      </p>
    </div>
  )
}

export default FeedbackCard
