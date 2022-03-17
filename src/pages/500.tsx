import { Button, GridContainer } from '@trussworks/react-uswds'
import { useRouter } from 'next/router'

import { withErrorLayout } from 'layout/ErrorLayout/ErrorLayout'
import Logo from 'components/Logo/Logo'

export default function Custom500() {
  const router = useRouter()

  const handleBackClick = () => router.back()

  return (
    <>
      <GridContainer>
        <section>
          <Logo noText />

          <h2>Houston, we have a problem</h2>

          <h3>
            That’s an internal server error. While we work on fixing that, let’s
            get you back to business.
          </h3>

          <Button type="button" secondary onClick={handleBackClick}>
            Return to previous page
          </Button>
        </section>
      </GridContainer>
      <div style={{ overflow: 'hidden' }}>
        <h1>500</h1>
      </div>
    </>
  )
}

Custom500.getLayout = withErrorLayout
