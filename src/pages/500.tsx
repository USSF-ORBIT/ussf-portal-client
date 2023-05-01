import { Button, GridContainer } from '@trussworks/react-uswds'
import { useRouter } from 'next/router'

import { withErrorLayout } from 'layout/ErrorLayout/ErrorLayout'
import Logo from 'components/Logo/Logo'

const FEEDBACK_EMAIL = 'feedback@ussforbit.us'
const FEEDBACK_SUBJECT = 'USSF portal feedback -- 500 page error'

export default function Custom500() {
  const router = useRouter()

  const handleBackClick = () => router.back()

  return (
    <>
      <h1>500</h1>
      <GridContainer>
        <section>
          <Logo noText />

          <h2>Houston, we have a problem</h2>

          <h3>
            That’s an internal server error. While we work on fixing that, let’s
            get you back to business.
          </h3>
          <h3>
            You may also submit a report to us at{' '}
            <a
              href={`mailto:${FEEDBACK_EMAIL}?subject=${FEEDBACK_SUBJECT}`}
              target="_blank"
              rel="noreferrer noopener"
              className="usa-link">
              {FEEDBACK_EMAIL}
            </a>{' '}
            to tell us about what happened that brought you here.
          </h3>

          <div className="flex-align-center">
            <Button type="button" secondary onClick={handleBackClick}>
              Return to previous page
            </Button>
            <a
              href={`mailto:${FEEDBACK_EMAIL}?subject=${FEEDBACK_SUBJECT}`}
              target="_blank"
              rel="noreferrer noopener"
              className="usa-button usa-button--outline usa-button--inverse">
              Report a bug
            </a>
          </div>
        </section>
      </GridContainer>
    </>
  )
}

Custom500.getLayout = withErrorLayout