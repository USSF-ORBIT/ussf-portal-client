import Head from 'layout/head'

import Logo from 'components/Logo/Logo'

export const config = {
  unstable_runtimeJS: false,
}

export default function Home() {
  return (
    <>
      <Head />

      <main>
        <Logo />
        USSF Portal
      </main>
    </>
  )
}
