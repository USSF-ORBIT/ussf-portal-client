import { GridContainer } from '@trussworks/react-uswds'
import Head from 'next/head'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'
import { withErrorLayout } from 'layout/ErrorLayout/ErrorLayout'
import LinkTo from 'components/util/LinkTo/LinkTo'
import Logo from 'components/Logo/Logo'
import { useAnalytics } from 'stores/analyticsContext'

const FEEDBACK_EMAIL = 'feedback@ussforbit.us'
const FEEDBACK_SUBJECT = 'USSF portal feedback -- 404 page error'

export default function Custom404() {
  const { user } = useUser()
  const { trackEvent } = useAnalytics()

  trackEvent('Error page', 'Page missing', '404', window.location.pathname)

  return !user ? (
    <Loader />
  ) : (
    <>
      {/* 404 Page cannot have props, so we use the Head component to set the title */}
      <Head>
        <title>404 Error - USSF Portal</title>
      </Head>
      <h1>404</h1>
      <GridContainer>
        <section>
          <Logo noText />

          <h2>Looks like you’re a little lost</h2>

          <h3>
            That page doesn’t exist (or never did). Let’s get you back where you
            belong, or send us a dispatch to notify us of an error in the
            system.
          </h3>
          <div className="flex-align-center">
            <LinkTo className="usa-button usa-button--secondary" href="/">
              Take me home
            </LinkTo>
            <a
              href={`mailto:${FEEDBACK_EMAIL}?subject=${FEEDBACK_SUBJECT}`}
              target="_blank"
              rel="noreferrer noopener"
              className="usa-button usa-button--outline usa-button--inverse">
              Contact Us
            </a>
          </div>
        </section>
      </GridContainer>
    </>
  )
}

Custom404.getLayout = withErrorLayout
