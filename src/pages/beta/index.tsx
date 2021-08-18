import { parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'

import LinkTo from 'components/util/LinkTo/LinkTo'

const Home = () => {
  const router = useRouter()
  const cookies = parseCookies()

  const exitBeta = () => {
    destroyCookie(null, 'betaOptIn')
    router.push('/')
  }

  return (
    <>
      <h1>Welcome to Beta!</h1>
      <p>Cookie value? {cookies.betaOptIn}</p>

      <ul>
        <li>
          <LinkTo href="/about-us">About Us</LinkTo>
        </li>
        <li>
          <LinkTo href="/testing">A new page</LinkTo>
        </li>
      </ul>

      <button type="button" onClick={exitBeta}>
        Leave beta
      </button>
    </>
  )
}

export default Home
