// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md#case-i-use-nextjs-and-im-getting-this-error-inside-of-links
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'

import Logo from 'components/Logo/Logo'

export const config = {
  unstable_runtimeJS: false,
}

const Home = () => {
  return (
    <>
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
