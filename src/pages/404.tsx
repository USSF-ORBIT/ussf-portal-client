import { GridContainer } from '@trussworks/react-uswds'

import { useUser } from 'hooks/useUser'

import Loader from 'components/Loader/Loader'
import { withErrorLayout } from 'layout/Beta/ErrorLayout/ErrorLayout'
import LinkTo from 'components/util/LinkTo/LinkTo'
import Logo from 'components/Logo/Logo'

export default function Custom404() {
  const { user } = useUser()

  return !user ? (
    <Loader />
  ) : (
    <>
      <GridContainer containerSize="widescreen">
        <section>
          <Logo noText />

          <h2>Looks like you’re a little lost</h2>

          <h3>
            That page doesn’t exist (or never did). Let’s get you back where you
            belong.
          </h3>

          <LinkTo className="usa-button usa-button--secondary" href="/">
            Take me home
          </LinkTo>
        </section>
      </GridContainer>
      <div style={{ overflow: 'hidden' }}>
        <h1>404</h1>
      </div>
    </>
  )
}

Custom404.getLayout = withErrorLayout
