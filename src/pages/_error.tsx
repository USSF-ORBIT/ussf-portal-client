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

  // TODO - copy?
  return (
    <>
      <GridContainer>
        <section>
          <Logo noText />

          <h2>Houston, we have a problem</h2>

          <h3>
            That’s {statusCode ? `an internal server error` : 'a client error'}.
            While we work on fixing that, let’s get you back to business.
          </h3>

          <Button type="button" secondary onClick={handleBackClick}>
            Return to previous page
          </Button>
        </section>
      </GridContainer>
      {statusCode && (
        <div style={{ overflow: 'hidden' }}>
          <h1>{statusCode}</h1>
        </div>
      )}
    </>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

Error.getLayout = withErrorLayout

export default Error
