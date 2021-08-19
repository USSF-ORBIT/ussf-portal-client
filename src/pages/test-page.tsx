import type { ReactNode } from 'react'
import Head from 'next/head'

const TestPage = () => {
  return (
    <>
      <Head>
        <title>Space Force Portal | Test Page</title>
        <meta name="description" content="Test page description" />
      </Head>

      <main>USSF Portal test page!</main>
    </>
  )
}

export default TestPage

const BetaLayout = (page: ReactNode) => (
  <main>
    <h1>Not an MVP page</h1>
    {page}
  </main>
)

TestPage.getLayout = BetaLayout
