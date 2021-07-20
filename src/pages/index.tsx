// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md#case-i-use-nextjs-and-im-getting-this-error-inside-of-links
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'

import Logo from 'components/Logo/Logo'

const Home = () => {
  return (
    <>
      <Logo />
      USSF Portal
      <Link href="/test-page">
        <a>A test page</a>
      </Link>
    </>
  )
}

export default Home
