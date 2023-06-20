import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import { Button, GridContainer } from '@trussworks/react-uswds'
import { useRouter } from 'next/router'
import { useAnalytics } from 'stores/analyticsContext'
import { withErrorLayout } from 'layout/ErrorLayout/ErrorLayout'
import Logo from 'components/Logo/Logo'

const FEEDBACK_EMAIL = 'feedback@ussforbit.us'

interface Props {
  statusCode?: number
}

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

const Error: NextPageWithLayout<Props> = ({ statusCode }: Props) => {
  const { trackEvent } = useAnalytics()
  const router = useRouter()
  const handleBackClick = () => router.back()
  const errorCode = statusCode ? statusCode : 500

  // TODO: see if error message is also passed in so we can include that
  trackEvent(
    'Error page',
    'Internal error',
    errorCode.toString(),
    window.location.pathname
  )

  const feedback_subject = `USSF portal feedback -- ${errorCode} page error`

  return (
    <>
      <Head>
        <title>Error - USSF Portal</title>
      </Head>
      <h1>{errorCode}</h1>
      <GridContainer>
        <section>
          <Logo noText />

          <h2>Houston, we have a problem</h2>

          <h3>
            That’s an internal server error. While we work on fixing that, let’s
            get you back to business. You may also submit a report to us at{' '}
            <a
              href={`mailto:${FEEDBACK_EMAIL}?subject=${feedback_subject}`}
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
              href={`mailto:${FEEDBACK_EMAIL}?subject=${feedback_subject}`}
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

Error.getInitialProps = ({ res, err = { statusCode: 404 } }) => {
  const statusCode = res?.statusCode || err?.statusCode
  return { statusCode }
}

Error.getLayout = withErrorLayout

export default Error
