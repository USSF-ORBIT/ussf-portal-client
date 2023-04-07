import { ButtonGroup, GridContainer } from '@trussworks/react-uswds'

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

  return !user ? (
    <Loader />
  ) : (
    <>
      <GridContainer>
        <section>
          <Logo noText />

          <h2>Looks like you’re a little lost</h2>

          <h3 className="width-tablet">
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
              className="usa-button usa-button--outline usa-button--inverse"
              onClick={() => trackEvent('Feedback', FEEDBACK_EMAIL)}>
              Contact Us
            </a>
          </div>
        </section>
      </GridContainer>
      <h1>404</h1>
    </>
  )
}

Custom404.getLayout = withErrorLayout
