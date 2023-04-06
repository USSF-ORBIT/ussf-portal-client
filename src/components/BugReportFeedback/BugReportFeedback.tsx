import React from 'react'

import { useAnalytics } from 'stores/analyticsContext'

const FEEDBACK_EMAIL = 'feedback@ussforbit.us'
const FEEDBACK_SUBJECT = 'USSF portal feedback - error page'

const BugReportFeedback = () => {
  const { trackEvent } = useAnalytics()

  return (
    <div>
      <p>
        Send us a message at{' '}
        <a
          href={`mailto:${FEEDBACK_EMAIL}?subject=${FEEDBACK_SUBJECT}`}
          target="_blank"
          rel="noreferrer noopener"
          className="usa-link"
          onClick={() => trackEvent('Feedback', FEEDBACK_EMAIL)}>
          {FEEDBACK_EMAIL}
        </a>{' '}
        to report a bug or unexpected error.
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

export default BugReportFeedback
