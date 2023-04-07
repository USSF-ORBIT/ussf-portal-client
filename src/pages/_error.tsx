import type { NextPage, NextPageContext } from 'next'
import type { ReactElement, ReactNode } from 'react'
import { Button, GridContainer } from '@trussworks/react-uswds'
import { useRouter } from 'next/router'

import { withErrorLayout } from 'layout/ErrorLayout/ErrorLayout'
import Logo from 'components/Logo/Logo'

interface Props {
  statusCode?: number
}

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

const Error: NextPageWithLayout<Props> = ({ statusCode }: Props) => {
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
            get you back to business. You may also submit a report to us at{' '}
            <a
              href={`mailto:${FEEDBACK_EMAIL}?subject=${FEEDBACK_SUBJECT}`}
              target="_blank"
              rel="noreferrer noopener"
              className="usa-link"
              onClick={() => trackEvent('Feedback', FEEDBACK_EMAIL)}>
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
              className="usa-button usa-button--outline usa-button--inverse"
              onClick={() => trackEvent('Feedback', FEEDBACK_EMAIL)}>
              Report a bug
            </a>
          </div>
        </section>
      </GridContainer>
    </>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

Error.getLayout = withErrorLayout

export default Error
