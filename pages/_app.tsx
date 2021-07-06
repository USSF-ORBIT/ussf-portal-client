import '@trussworks/react-uswds/lib/index.css'
import 'styles/index.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
