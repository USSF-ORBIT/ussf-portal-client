// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md#case-i-use-nextjs-and-im-getting-this-error-inside-of-links
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'

import Head from 'layout/head'
import Logo from 'components/Logo/Logo'

export const config = {
  unstable_runtimeJS: false,
}

type HomeProps = {
  canonicalDomain: string
}

const Home = (props: HomeProps) => {
  const { canonicalDomain } = props

  return (
    <>
      <Head canonicalUrl={canonicalDomain} />

      <main>
        <Logo />
        USSF Portal
        <Link href="/test">
          <a>A test page</a>
        </Link>
      </main>
    </>
  )
}

export default Home
