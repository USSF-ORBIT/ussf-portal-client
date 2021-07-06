import Head from 'next/head'

import Logo from 'components/Logo/Logo'

export const config = {
  unstable_runtimeJS: false,
}

export default function Home() {
  return (
    <>
      <Head>
        <title>USSF Portal</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Logo />
        USSF Portal
      </main>
    </>
  )
}
